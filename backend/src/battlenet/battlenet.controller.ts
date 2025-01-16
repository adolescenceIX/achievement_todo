import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { BattlenetService } from './battlenet.service';

@Controller('battlenet')
export class BattlenetController {
  constructor(private readonly bnetService: BattlenetService) {}
  @Get('achievements')
  async getAchievements() {
    const achievements = (await this.bnetService.getAchievements()).data;
    return achievements;
  }
  @Get('achievement/:id')
  async getAchievement() {}
}
