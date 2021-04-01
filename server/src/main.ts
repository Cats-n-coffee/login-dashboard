import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './common/error.filter';
import { ResponseInterceptor } from './common/response.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.use(cookieParser());

  const conf = app.get(ConfigService);
  const port = conf.get('app.port');
  await app.listen(port, () => {
    console.log(`\n
      ================================================
          Application started at port ${port}
      ================================================
     \n`);
  });
}
bootstrap();
