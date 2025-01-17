import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { BattlenetService } from 'src/battlenet/battlenet.service';
import { BnetTokenResponse } from 'src/common/types';
import { BNET_TOKEN_CACHE } from 'src/utils/constants';

@Injectable()
export class BnetInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly bnetService: BattlenetService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return from(this.checkToken()).pipe(
      switchMap(() => next.handle()),
      catchError((err) =>
        throwError(
          () =>
            new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR),
        ),
      ),
    );
  }

  async checkToken(): Promise<void> {
    const token = await this.cacheManager.get(BNET_TOKEN_CACHE);
    if (!token) {
      try {
        const newToken = (await this.bnetService.fetchToken())
          .data as BnetTokenResponse;
        if (!newToken) {
          console.error('Failed to fetch a new token.');
          throw new Error('Unable to fetch token.');
        }
        await this.cacheManager.set(
          BNET_TOKEN_CACHE,
          newToken.access_token,
          newToken.expires_in,
        );
      } catch (e) {
        console.error('Error fetching or saving token: ', e);
        throw e;
      }
    }
  }
}
