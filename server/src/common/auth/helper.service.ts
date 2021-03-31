import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from './crypto/crypto.service';
import { IAutheUser, IUser } from './user.interface';

type TokenType = 'token' | 'refresh';
@Injectable()
export class HelperService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
    private readonly confService: ConfigService,
  ) {}

  /**
   * Sign user with given user data
   * @params {IUser}
   * @returns {IAutheUser} user data with authentication information(access token and refresh token)
   */
  signUser(user: IUser): IAutheUser {
    const payload = { ...user, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.cryptoService.signRefreshToken(payload);
    return { ...user, token: refreshToken, access: accessToken };
  }

  /**
   * Get authentication cookie(access and refresh token cookie) for an authenticated user
   * @params {IAuthedUser} authedUser the user data with authentication information
   * @returns {token:Record<key, string>, access:Record<key, string>} the authentication cookie information
   */
  getAuthCookies(authedUser: IAutheUser) {
    const { access, token } = authedUser;
    return {
      access: this.getTokenCookie('token', access),
      token: this.getTokenCookie('refresh', token),
    };
  }

  /**
   * Get authentication cookie(access and refresh token cookie) for an authenticated user
   * @params {IAuthedUser} authedUser the user data with authentication information
   * @returns {token:Record<key, string>, access:Record<key, string>} the authentication cookie information
   * with expiration time as zeo
   */
  getCleanedAuthCookies(authedUser: IAutheUser) {
    const { access, token } = authedUser;
    return {
      access: this.getTokenCookie('token', access, true),
      token: this.getTokenCookie('refresh', token, true),
    };
  }

  /**
   * Get authentication cookie.
   * @params {TokenType} the token type, etiher be "token" or "refresh"
   * @params {string} the token value
   * @param {boolean} isClean  boolean type, providing true value means clean the cookie
   * @returns {<Record<string, string>}
   * with expiration time as zeo
   */
  private getTokenCookie(
    type: TokenType,
    value: string,
    doClean?: boolean,
  ): Record<string, string> {
    let { name, expiresIn } = this.confService.get(`app.auth.${type}`);
    if (doClean) {
      expiresIn = 0;
    }
    const isProd = process.env.NODE_ENV === 'production';
    let cookie = `${name}=${value};HttpOnly=true;Path=/;Max-Age=${expiresIn};`;
    if (isProd) {
      cookie += 'Secure=true;SameSite=None';
    }
    return { name, value: cookie };
  }
}
