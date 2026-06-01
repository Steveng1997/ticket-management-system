import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('TicketsService', () => {
  let service: TicketsService;

  // Creamos mocks para las dependencias
  const mockTicketRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
  };

  const mockEventEmitter = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsService,
        {
          provide: getRepositoryToken(Ticket), // Proporcionamos el repositorio mock
          useValue: mockTicketRepository,
        },
        {
          provide: EventEmitter2, // Proporcionamos el EventEmitter mock
          useValue: mockEventEmitter,
        },
      ],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
