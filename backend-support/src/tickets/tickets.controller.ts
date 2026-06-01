import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  // Crea la solicitud: POST
  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  // Listar y filtrar todos los tickets: GET
  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('priority') priority?: string,
  ) {
    return this.ticketsService.findAll(status, priority);
  }

  // Asignar persona: PATCH
  // Recibir el email del responsable en el cuerpo
  @Patch(':id')
  assign(@Param('id') id: string, @Body('assignedTo') assignedTo: string) {
    return this.ticketsService.assign(+id, assignedTo);
  }

  @Get('stats')
  getStats() {
    return this.ticketsService.getStats();
  }
}
