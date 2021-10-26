import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigurationService } from '../../common/configurations/config.service';
import { IntentsApiService } from './intent-api.service';
import { Iintent } from './interfaces/intents';
import { Reply } from './models/replies.entity';
import { ReplyService } from './replies.service';

describe.only('EmployeeService', () => {
  let service: ReplyService;
  let mockIntents: Iintent[];
  beforeAll(async () => {
    mockIntents = [
      {
        "name": "Greeting",
        "confidence": 0.81
      },
      {
        "name": "Delivery status",
        "confidence": 0.18
      },
      {
        "name": "Refund possibility",
        "confidence": 0.01
      }
    ];

    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplyService, {
          provide: IntentsApiService,
          useValue: {},
        },
        { provide: getRepositoryToken(Reply), useClass: Repository },

      ],
    }).compile();

    service = module.get<ReplyService>(ReplyService);


  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*Intents resolver tests*/
  it('Returns a single reply corresponding to  the highest predicted intent abpve the confidence threshhold(0.81) given the mock paylaod', () => {

    expect(service.intentResolver(mockIntents)).toEqual(0.81);
  });

  it('Returns 0 when given no intents at all', () => {

    expect(service.intentResolver([])).toEqual(0);
  });

  });
