import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { BattlenetService } from './battlenet.service';

@Controller('battlenet')
export class BattlenetController {
  constructor(private readonly bnetService: BattlenetService) {}
  @Get('achievements')
  getAchievements() {
    this.bnetService.getAchievements();
  }
}
