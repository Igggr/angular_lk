import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/common-types/ticket';
import { UserInfo } from 'src/app/common-types/user';
import { BACKEND_URL, CURRENT_USER, TICKET_PATH } from 'src/app/const';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor() {}
  
  ngOnInit() {
    const user: string | null = localStorage.getItem(CURRENT_USER);
    if (user === null) {
      return;
    }
    const currentUser: UserInfo = JSON.parse(user);
    this.tickets = currentUser.tickets;
  }
}
