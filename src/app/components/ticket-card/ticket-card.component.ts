import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Ticket } from 'src/app/common-types/ticket';
import { BACKEND_URL, TICKET_PATH, TICKET_REOPEN_PATH } from 'src/app/const';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss']
})
export class TicketCardComponent {
  @Input() ticket!: Ticket;

  constructor(private readonly http: HttpClient) {}
  
  closeTicket(id: number) {
    this.http.delete(`${BACKEND_URL}/${TICKET_PATH}/`, {
      body: { id: id } // стоило бы передавать в ссылке, но усложнит mock-backend
    })
  }

  reopenTicket(id: number) {
    this.http.post(`${BACKEND_URL}/${TICKET_REOPEN_PATH}`, { id });
  }

}
