import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BattlenetController } from './battlenet/battlenet.controller';
import { BattlenetService } from './battlenet/battlenet.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      port: parseInt(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: false,
    }),
    CacheModule.register(),
  ],
  controllers: [AppController, BattlenetController],
  providers: [AppService, BattlenetService],
})
export class AppModule {}
