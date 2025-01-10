import { HttpService } from '@nestjs/axios';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BattlenetService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.getToken().then((response) => {
      const token = response.data.access_token;
      cacheManager.set('battlenet_token', token, token.expires_in);
    });
  }

  async getToken() {
    return await firstValueFrom(
      this.httpService.post(
        `${process.env.BATTLENET_API_URL}/oauth/token`,
        null,
        {
          params: { grant_type: 'client_credentials' },
          auth: {
            username: process.env.BATTLENET_CLIENT_ID,
            password: process.env.BATTLENET_CLIENT_SECRET,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );
  }

  async getAchievements() {
    const token = await this.cacheManager.get('battlenet_token');
    console.log(token);
  }
}
