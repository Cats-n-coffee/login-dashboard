import { Injectable } from '@nestjs/common';
import {
  HelperService,
  IAutheUser,
  RegisterDto,
  UserService,
} from 'src/common/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly helperService: HelperService,
  ) {}

  async registerUser(registerDto: RegisterDto): Promise<IAutheUser> {
    const user = await this.userService.createUser(registerDto);
    return this.helperService.signUser(user);
  }

  async logoutUser(user: IAutheUser) {
    await this.userService.updateUser(user.id, { token: null });
  }
}
