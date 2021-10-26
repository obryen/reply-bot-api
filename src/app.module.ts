import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConfigurationModule } from './common/configurations/configurations.module';
import { TypeOrmConfigService } from './common/configurations/type-orm-config.service';
import { ReplyModule } from './modules/replies/replies.module';


@Module({
  imports: [ReplyModule, TypeOrmModule.forRootAsync({
    imports: [ConfigurationModule],
    useExisting: TypeOrmConfigService,
  }),],
  providers: [AppService],
})
export class AppModule {}
