import { Injectable } from '@nestjs/common';
import { envConfigs as env } from './environment';

@Injectable()
export class ConfigurationService {
  get baseFolder(): string {
    const regex = /common+(\/|\\)+config/gi;
    return __dirname.replace(regex, '');
  }

  get appName(): string {
    return String(env.APP_NAME);
  }

  get appVersion(): string {
    return String(env.APP_VERSION);
  }

  get nodeEnv(): string {
    return String(env.NODE_ENV);
  }

  get port(): number {
    return Number(env.PORT);
  }

  get databaseHost(): string {
    return String(env.DATABASE_HOST);
  }

  get databasePort(): number {
    return Number(env.DATABASE_PORT);
  }

  get databaseName(): string {
    return `${env.DATABASE_NAME}`;
  }

  get databaseUser(): string {
    return `${env.DATABASE_USER}`;
  }

  get typeormMigrationsrun(): boolean {
    return Boolean(env.TYPEORM_MIGRATIONSRUN);
  }
  get typeormLogging(): boolean {
    return Boolean(env.TYPEORM_LOGGING);
  }
  get databasePassword(): string {
    return String(env.DATABASE_PASSWORD);
  }

  get intentApi(): string {
    return String(env.INTENT_API);
  }
  get intentApiKey(): string {
    return String(env.INTENT_API_KEY);
  }
}
