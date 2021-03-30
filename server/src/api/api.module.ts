import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LogMiddleware } from 'src/common/log.middleware';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [AuthModule, DashboardModule],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('api');
  }
}
