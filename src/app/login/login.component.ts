import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LOGIN_ERROR, MAIN_PAGE_PATH, REDIRECT_QUERY } from '../const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';
  showPassword = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.authService.login(this.username, this.password)
      .subscribe((data) => {
        if (this.authService.isAutenticated) {
          console.log('sucessefully authenticated');
          console.log(data)

          const redirectTo = this.route.snapshot.queryParamMap.get(REDIRECT_QUERY)
            ?? MAIN_PAGE_PATH;
          this.router.navigate([redirectTo]);
        } else {
          this.error = LOGIN_ERROR;
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
