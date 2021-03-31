import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(confService: ConfigService) {
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

  async validate(payload: any): Promise<any> {}
}
