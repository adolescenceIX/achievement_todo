import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { BattlenetService } from './battlenet.service';
import { BnetInterceptor } from 'src/interceptors/bnet.interceptor';

@Controller('battlenet')
@UseInterceptors(BnetInterceptor)
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
