import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CryptoService } from '../crypto/crypto.service';
import { RegisterDto } from './dto/register.dto';
import { IUserRecord, IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly cryptoService: CryptoService,
  ) {}

  /**
   * Create an user with user email, password, and username(optional)
   * @param {RegisterDto} regiserDto user registration data
   * @returns {IUserRecord} user data(without password)
   */
  async createUser(registerDto: RegisterDto): Promise<IUser> {
    const userData = {
      ...registerDto,
      password: this.cryptoService.hashPwd(registerDto.password),
    };
    const user = await this.userRepo.create(userData);
    return this.userRepo
      .save(user)
      .then((user) => {
        const { user_id, password, ...data } = user;
        return { id: user_id, ...data };
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

  /**
   * Find an user with either by email or token
   * @returns{IUserRecord|null} return user record or null record
   */
  findUser(filter: any): Promise<IUserRecord | null> {
    return this.userRepo.findOne(filter).then((user) => {
      if (user) {
        const { user_id, ...data } = user;
        return { id: user_id, ...data };
      }
      return null;
    });
  }

  /**
   * Update an user by user id and update data
   * @param{string} uId the user id
   * @param{Partial<IUserRecord>} update  the update data
   */
  updateUser(uId: string, update: Partial<IUserRecord>) {
    return this.userRepo.update(uId, update);
  }
}
