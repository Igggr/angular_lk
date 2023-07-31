import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ticket } from 'src/app/common-types/ticket';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss']
})
export class TicketCardComponent {
  @Input() ticket!: Ticket;
  @Output() ticketUpdate = new EventEmitter();

  setTicketStatus(status: boolean) {
    this.ticketUpdate.emit({ ...this.ticket, isOpened: status });
  }

  updateTicket() {
    this.ticketUpdate.emit(this.ticket);
  }
}
