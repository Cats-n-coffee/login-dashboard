import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from '../user.service';
import { IUser } from '../user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService, confService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          try {
            const { name } = confService.get('app.auth.token');
            return req.cookies[name];
          } catch (e) {
            return '';
          }
        },
      ]),
      secretOrKey: confService.get('app.auth.token').secret,
    });
  }

  async validate({ sub }: any): Promise<IUser> {
    const user = await this.userService.findUser({ user_id: sub });
    if (user) return user;
    throw new ForbiddenException('Wrong credentials provided');
  }
}
