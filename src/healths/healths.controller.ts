import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('healths')
export class HealthsController {
  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpHealthIndicator,
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  @Get('status')
  @HealthCheck()
  status() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'service',
          `${this.configService.get('NEST_BASE_URL')}/healths`,
        ),
      () => this.db.pingCheck('database'),
    ]);
  }
}
