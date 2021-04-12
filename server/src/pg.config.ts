import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PgConf implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions() {
    const conf = this.configService.get('db.pg');
    return {
      ...conf,
      type: 'postgres',
      entities: ['dist/entities/*.entity.js'],
    };
  }
}
