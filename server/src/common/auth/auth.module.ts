import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (conf: ConfigService) => {
        const { secret, expiresIn } = conf.get('app.auth.token');
        return { secret, signOptions: { expiresIn: `${expiresIn}s` } };
      },
    }),
  ],
  providers: [UserService, LocalStrategy, JwtStrategy, AuthService],
})
export class AuthModule {}
