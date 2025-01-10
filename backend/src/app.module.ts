import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BattlenetController } from './battlenet/battlenet.controller';
import { BattlenetService } from './battlenet/battlenet.service';

@Module({
  imports: [],
  controllers: [AppController, BattlenetController],
  providers: [AppService, BattlenetService],
})
export class AppModule {}
