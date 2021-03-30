import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ApiModule,
    CommonModule,
  ],
  providers: [AppService],
})
export class AppModule {}
