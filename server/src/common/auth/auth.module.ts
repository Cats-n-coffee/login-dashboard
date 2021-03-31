import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserService } from './user.service';
import { HelperService } from './helper.service';
import { CryptoModule } from './crypto/crypto.module';

@Global()
@Module({
  imports: [
    CryptoModule,
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
  providers: [UserService, LocalStrategy, JwtStrategy, HelperService],
  exports: [HelperService, UserService],
})
export class AuthModule {}
