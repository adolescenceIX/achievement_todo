import { HttpService } from '@nestjs/axios';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { BNET_TOKEN_CACHE } from 'src/utils/constants';

@Injectable()
export class BattlenetService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async fetchToken(): Promise<AxiosResponse> {
    try {
      return await firstValueFrom(
        this.httpService.post(
          `${process.env.BATTLENET_OAUTH_URL}/oauth/token`,
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
    } catch (e) {
      console.error(e);
    }
  }

  async getAchievements() {
    try {
      const token = await this.cacheManager.get(BNET_TOKEN_CACHE);
      return await firstValueFrom(
        this.httpService.get(
          `${process.env.BATTLENET_API_URL}/data/wow/achievement/index?namespace=static-eu&locale=en_GB`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
    } catch (e) {
      console.error(e);
    }
  }
}
