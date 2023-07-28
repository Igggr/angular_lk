import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';
  error = {};

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    console.log('trying to login');

    this.authService.login(this.username, this.password)
      .subscribe((data) => {
        console.log('data', data);
        if (this.authService.isAutenticated) {
          const redirect = this.authService.redirectUrl ?? '/';
          this.router.navigate([redirect]);
        } else {
          this.loginError = 'Username or password is incorrect.';
        }
      },
        error => this.error = error
      );;
  }

  register() {
    console.log('registration')
    this.authService.register(this.username, this.password)
      .subscribe((data) => {
        console.log('data', data);
      })

  }
}
