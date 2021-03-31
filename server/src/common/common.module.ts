import { Global, Module } from '@nestjs/common';
import { CryptoModule } from './crypto/crypto.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CryptoModule, AuthModule],
  exports: [CryptoModule],
})
export class CommonModule {}
