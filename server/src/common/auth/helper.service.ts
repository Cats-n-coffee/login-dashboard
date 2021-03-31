import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from './crypto/crypto.service';
import { IAutheUser, IUser } from './user.interface';

@Injectable()
export class HelperService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
    private readonly confService: ConfigService,
  ) {}

  signUser(user: IUser): IAutheUser {
    const payload = { ...user, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.cryptoService.signRefreshToken(payload);
    return { ...user, token: refreshToken, access: accessToken };
  }

  getAuthCookies(authedUser: IAutheUser) {
    const { access, token } = authedUser;
    return {
      access: this.getTokenCookie('token', access),
      token: this.getTokenCookie('refresh', token),
    };
  }

  private getTokenCookie(type: 'token' | 'refresh', value: string) {
    const { name, expiresIn } = this.confService.get(`app.auth.${type}`);
    const isProd = process.env.NODE_ENV === 'production';
    let cookie = `${name}=${value};HttpOnly=true;Path=/;Max-Age=${expiresIn};`;
    if (isProd) {
      cookie += 'Secure=true;SameSite=None';
    }
    return { name, value: cookie };
  }
}
