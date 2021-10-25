import { Injectable } from '@nestjs/common';
import { ConfigurationService } from './common/configurations/config.service';

@Injectable()
export class AppService {

  constructor(
    private readonly configs: ConfigurationService,
  ) { }
  home() {
    return {
      message: 'Welcome to the replies API, a product of Ultimate AI',
      version: this.configs.appVersion,
    };
  }
}
