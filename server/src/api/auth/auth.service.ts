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

  async logoutUser(user: IAutheUser): Promise<void> {
    await this.userService.updateUser(user.id, { token: null });
  }

  async renewToken(cookies: Record<string, string>): Promise<IAutheUser> {
    const { name } = this.confService.get('app.auth.refresh');
    const token = cookies[name].split(';')[0].split('=')[1];
    if (!token) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const user = await this.userService.findUser({ token });
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    if (!this.crytoService.verifyRefreshToken(token)) {
      throw new UnauthorizedException(`Credential is expired.`);
    }

    return this.helperService.signUser(user);
  }
}
