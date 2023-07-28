import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService,],
})
export class AppComponent {
  title = 'lk-front';

  constructor(readonly authService: AuthService) { }
}
