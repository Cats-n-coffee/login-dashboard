import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from 'src/common/crypto/crypto.service';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly cryptoService: CryptoService,
  ) {}

  registerUser(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;
    const user = new User();
    user.email = email;
    user.password = this.cryptoService.hashPwd(password);
    user.token = this.cryptoService.signRefreshToken({
      sub: email,
    });
    if (username) user.username = username;
    return this.userRepo
      .save(user)
      .then((user) => {
        delete user.password;
        return user;
      })
      .catch((e) => {
        if (+e?.code === 23505) {
          const msg = `Email: ${registerDto.email} already exists.`;
          throw new BadRequestException(msg);
        } else {
          throw Error(e);
        }
      });
  }

  loginUser(loginDto: LoginDto) {}
}
