import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntentsApiService } from './intent-api.service';
import { Reply as Reply } from './models/replies.entity';
import { RepliesController } from './replies.controller';
import { ReplyService } from './replies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reply]),
    HttpModule],
  controllers: [RepliesController],
  providers: [ReplyService, IntentsApiService],
  exports: [ReplyService, IntentsApiService],
})
export class ReplyModule {
}
