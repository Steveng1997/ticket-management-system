import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Ticket, TicketStatus } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private repo: Repository<Ticket>,
    private event: EventEmitter2,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    const ticket = this.repo.create(createTicketDto);
    return await this.repo.save(ticket);
  }

  async findAll(status?: string, priority?: string) {
    const where: Record<string, any> = {};

    if (status) where.status = status as TicketStatus;
    if (priority) where.priority = priority;

    return await this.repo.find({ where });
  }

  async assign(id: number, assignedTo: string) {
    const ticket = await this.repo.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException(`Ticket con ID ${id} no encontrado`);
    }

    await this.repo.update(id, { assignedTo });
    this.event.emit('ticket.assigned', { ticketId: id, email: assignedTo });

    return await this.repo.findOneBy({ id });
  }

  async getStats() {
    const tickets = await this.repo.find();

    const byStatus = tickets.reduce(
      (acc: Record<string, number>, t: Ticket) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
      },
      {},
    );

    const byPriority = tickets.reduce(
      (acc: Record<string, number>, t: Ticket) => {
        acc[t.priority] = (acc[t.priority] || 0) + 1;
        return acc;
      },
      {},
    );

    return {
      total: tickets.length,
      byStatus,
      byPriority,
    };
  }
}
