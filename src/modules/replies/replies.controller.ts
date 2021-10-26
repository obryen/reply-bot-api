import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ReplyService } from './replies.service';
import { IWrittenMessage } from './interfaces/written-message';


@Controller('Replies')
export class RepliesController {
  constructor(private RepliessService: ReplyService) {}

  @Post()
  createReplies(@Body() message: IWrittenMessage) {
    return this.RepliessService.postMessage(message);
  }
}
