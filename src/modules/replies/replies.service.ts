import {
  Injectable,
  OnModuleInit,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { IntentsApiService } from './intent-api.service';
import { Iintent } from './interfaces/intents';
import { IReply } from './interfaces/reply';
import { IWrittenMessage } from './interfaces/written-message';
import { Reply as Reply } from './models/replies.entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private readonly repliesRepository: Repository<Reply>,
    private readonly intentApiService: IntentsApiService
  ) { }





  async postMessage(incomingMessage: IWrittenMessage): Promise<IReply> {
    // get intent from message
    const intent = await this.processMessageToIntent(incomingMessage);

    // get reply from intent

    return await this.processIntentToReply(intent);
  }



  async processMessageToIntent(incomingMessage: IWrittenMessage): Promise<Iintent> {
    const intents = await this.fetchIntentsFromMessage(incomingMessage);

    const highestThreshHold = this.intentResolver(intents);

    return intents.find(i => i.confidence === highestThreshHold);
  }


  async processIntentToReply(intent: Iintent): Promise<IReply> {
    const replyData = await this.repliesRepository.findOne({
      where: {
        name: intent.name
      }
    })

    if (!replyData) {
      throw new NotFoundException('This intent is not yet defined');
    }
    return {
      reply: replyData.reply
    };
  }

  async fetchIntentsFromMessage(incomingReply: IWrittenMessage): Promise<Iintent[]> {
    if (!incomingReply || !incomingReply.botId || !incomingReply.message) {
      throw new BadRequestException('Invalid details');
    }

    // assign default value to bot id as instructed in document
    incomingReply.botId = '5f74865056d7bb000fcd39ff'

    const intents = await this.intentApiService.postToIntentsApi(incomingReply);

    return intents;
  }

  intentResolver(intents: Iintent[]): Number {
    // Returns a single reply corresponding to  the highest predicted intent abpve the confidence threshhold
    if (!intents || !intents.length) {
      return 0;
    }

    return Math.max.apply(Math, intents.map(i => i.confidence));
  }


}
