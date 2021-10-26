import {
  Injectable,
  HttpService,
  Logger,
} from '@nestjs/common';
import * as util from 'util';
import { AxiosResponse } from 'axios';
import { ConfigurationService } from '../../common/configurations/config.service';
import { IWrittenMessage } from './interfaces/written-message';
import { Iintent } from './interfaces/intents';


@Injectable()
export class IntentsApiService {
  intentApiBaseUrl: string;
  clientId: string;
  clientSecret: string;

  logger: Logger;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigurationService,

  ) {
    this.logger = new Logger('IntentsApiService');

    this.intentApiBaseUrl = this.configService.intentApi;
  }

  async postToIntentsApi(
    postData: IWrittenMessage,
  ): Promise<Iintent[]> {
    try {

      const postUrl = `${this.intentApiBaseUrl}/intents`;

      const headersRequest = {
        'Authorization': `${this.configService.intentApiKey}`,
      };

      const response = await this.httpService
        .post(postUrl, postData, { headers: headersRequest })
        .toPromise();
      this.logger.log('Response', util.inspect(response.data));

      return response.data ? response.data.intents : [];

    } catch (error) {
      this.logger.error(error, '[postToIntentsAPI] error');
      throw new Error(error);
    }
  }
}
