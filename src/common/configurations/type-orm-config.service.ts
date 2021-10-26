import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigurationService } from './config.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configs: ConfigurationService) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('Base folder', this.configs.baseFolder + '/modules/replies/models/*.entity{.ts,.js}',)
    return {
      type: 'postgres',
      host: this.configs.databaseHost,
      port: this.configs.databasePort,
      username: this.configs.databaseUser,
      password: this.configs.databasePassword,
      database: this.configs.databaseName,
      entities: [
        'Base folder', this.configs.baseFolder + '/modules/replies/models/*.entity{.ts,.js}',
        'dist/src/modules/replies/models/*.entity{.ts,.js}',
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
