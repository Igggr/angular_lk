import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/common-types/ticket';
import { UserInfo } from 'src/app/common-types/user';
import { CURRENT_USER } from 'src/app/const';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  tickets: Ticket[] = []
  jwt = '';

  ngOnInit() {
    const val = localStorage.getItem(CURRENT_USER);
    if (val) {
      const user: UserInfo = JSON.parse(val);
      this.jwt = '';
      this.tickets = user.tickets;
    }
  }

}
