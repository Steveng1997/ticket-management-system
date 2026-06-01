import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum TicketStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
}
export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.PENDING })
  status!: TicketStatus;

  @Column({ type: 'enum', enum: Priority, default: Priority.LOW })
  priority!: Priority;

  @Column({ nullable: true })
  assignedTo!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
