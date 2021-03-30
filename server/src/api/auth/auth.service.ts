import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from 'src/common/crypto.service';
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
    const user = new User();
    user.email = registerDto.email;
    user.password = this.cryptoService.hashPwd(registerDto.password);
    if (registerDto.username) user.username = registerDto.username;
    return this.userRepo.save(user);
  }

  loginUser(loginDto: LoginDto) {}
}
