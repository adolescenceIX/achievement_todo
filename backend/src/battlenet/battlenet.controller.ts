import { Controller, Get } from '@nestjs/common';

@Controller('battlenet')
export class BattlenetController {
  @Get('achievements')
  getAchievements() {}
}
