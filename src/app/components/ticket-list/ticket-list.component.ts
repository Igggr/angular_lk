import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from 'src/app/common-types/ticket';
import { UserInfo } from 'src/app/common-types/user';
import { BACKEND_URL, CURRENT_USER, TICKET_PATH } from 'src/app/const';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  @Input() jwt = '';
  tickets: Ticket[] = [];

  constructor(private readonly http: HttpClient) {}
  
  ngOnInit() {
    const user: string | null = localStorage.getItem(CURRENT_USER);
    if (user === null) {
      return;
    }
    const currentUser: UserInfo = JSON.parse(user);
    this.tickets = currentUser.tickets;
    this.jwt = currentUser.jwt;
  }

  setTicketStatus(event: { ticketId: number, status: boolean }) {
    console.log(`set ticket # ${event.ticketId} status as ${event.status ? 'open' : 'closed'}`)
    this.http.put<Ticket[]>(`${BACKEND_URL}/${TICKET_PATH}`, {
      id: event.ticketId,
      status: event.status,
      jwt: this.jwt
    }).subscribe({
      next: (data) => {
        this.tickets = data;
      }
    });
  }
}
