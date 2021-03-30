import { Global, Module } from '@nestjs/common';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [CryptoModule],
  exports: [CryptoModule],
})
export class CommonModule {}
