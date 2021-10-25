import { Global, Module } from '@nestjs/common';
import { ConfigurationService } from './config.service';
import { TypeOrmConfigService } from './type-orm-config.service';

@Global()
@Module({
  providers: [ConfigurationService, TypeOrmConfigService],
  exports: [ConfigurationService, TypeOrmConfigService],
})
export class ConfigurationModule {}

