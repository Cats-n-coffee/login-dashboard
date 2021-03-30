import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from 'src/common/crypto.service';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly cryptoService: CryptoService,
  ) {}

  registerUser(registerDto: {
    email: string;
    password: string;
    username?: string;
  }) {
    const user = new User();
    user.email = registerDto.email;
    user.password = this.cryptoService.hashPwd(registerDto.password);
    if (registerDto.username) user.username = registerDto.username;
    return this.userRepo.save(user);
  }
}
