import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class TicketListener {
  @OnEvent('ticket.assigned')
  handleEmail(payload: { ticketId: number; email: string }) {
    console.log(
      `Enviando correo a ${payload.email} por asignación del ticket ${payload.ticketId}`,
    );
    // Aquí iría la lógica real para enviar el correo
  }
}
