import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { TicketListener } from './ticket.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), EventEmitterModule.forRoot()],

  controllers: [TicketsController],
  providers: [TicketsService, TicketListener],
})
export class TicketsModule {}
