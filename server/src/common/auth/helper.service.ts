import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from './crypto/crypto.service';
import { IAutheUser, IUser } from './user.interface';

@Injectable()
export class HelperService {
  constructor(
    private cryptoService: CryptoService,
    private jwtService: JwtService,
  ) {}

  signUser(user: IUser): IAutheUser {
    const payload = { ...user, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.cryptoService.signRefreshToken(payload);
    return { ...user, token: refreshToken, access: accessToken };
  }
}
