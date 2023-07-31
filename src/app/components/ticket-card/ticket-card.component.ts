import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ticket } from 'src/app/common-types/ticket';
import { BACKEND_URL, TICKET_PATH } from 'src/app/const';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss']
})
export class TicketCardComponent {
  @Input() ticket!: Ticket;
  @Output() ticketStatus = new EventEmitter();

  setTicketStatus(ticketId: number, status: boolean) {
    this.ticketStatus.emit({ ticketId, status });
  }
}
