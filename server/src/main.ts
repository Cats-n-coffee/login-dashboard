import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ErrorFilter } from './common/error.filter';
import { ResponseInterceptor } from './common/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.use(cookieParser());
  app.enableCors({ credentials: true, origin: true });

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
