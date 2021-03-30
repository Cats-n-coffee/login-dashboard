import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  /**
   *  hash given password
   * @param pwd {string} plain password
   * @returns{string} hashed password
   */
  hashPwd(pwd: string): string {
    return bcrypt.hashSync(pwd, 10);
  }

  /**
   * compare plain password with hashed password
   * @param pwd {string} the plain password
   * @param hashedPwd {string} the hashed password
   * @returns {boolean} the comparation result
   */
  comparePwd(pwd: string, hashedPwd: string): boolean {
    return bcrypt.compareSync(pwd, hashedPwd);
  }
}
