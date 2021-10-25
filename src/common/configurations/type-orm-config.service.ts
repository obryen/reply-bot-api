import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigurationService } from './config.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configs: ConfigurationService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configs.databaseHost,
      port: this.configs.databasePort,
      username: this.configs.databaseUser,
      password: this.configs.databasePassword,
      database: this.configs.databaseName,
      entities: [
        this.configs.baseFolder + '/modules/**/*.entity{.ts,.js}',
        this.configs.baseFolder + '/modules/**/*.view{.ts,.js}',
      ],
      migrations: [
        this.configs.baseFolder + '/database/migrations/**/*{.ts,.js}',
      ],
      cli: {
        migrationsDir: this.configs.baseFolder + '/database/migrations',
      },
      synchronize: false,
      migrationsRun: this.configs.typeormMigrationsrun,
      logging: this.configs.typeormLogging,
    };
  }
}
