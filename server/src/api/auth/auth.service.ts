import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HelperService,
  IAutheUser,
  RegisterDto,
  UserService,
  CryptoService,
} from 'src/common/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly helperService: HelperService,
    private readonly confService: ConfigService,
    private readonly crytoService: CryptoService,
  ) {}

  async registerUser(registerDto: RegisterDto): Promise<IAutheUser> {
    const user = await this.userService.createUser(registerDto);
    return this.helperService.signUser(user);
  }

  async logoutUser(user: IAutheUser) {
    await this.userService.updateUser(user.id, { token: null });
  }

  async renewToken(cookies: any) {
    const { name } = this.confService.get('app.auth.refresh');
    const token = cookies[name];
    if (!token) {
      throw new UnauthorizedException('Wrong credentials');
      return;
    }

    const user = await this.userService.findUser({ token });
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
      return;
    }

    if (!this.crytoService.verifyRefreshToken(token)) {
      throw new UnauthorizedException(`Credential is expired.`);
      return;
    }

    return this.helperService.signUser(user);
  }
}
