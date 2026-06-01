import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { Priority, TicketStatus } from '../entities/ticket.entity';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;

  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus;
}
