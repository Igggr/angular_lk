import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LOGIN_ERROR, MAIN_PAGE_PATH, REDIRECT_QUERY } from '../../const';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  showPassword = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.authService.login(this.username, this.password)
      .subscribe({
        next: () => {
          if (this.authService.isAutenticated) {
            const redirectTo = this.route.snapshot.queryParamMap.get(REDIRECT_QUERY)
              ?? MAIN_PAGE_PATH;
            this.router.navigate([redirectTo]);
          } else {
            this.openSnackBar(LOGIN_ERROR);
          }
        },
        error: error => this.openSnackBar(error)
      });
  }

  register() {
    console.log('registration')
    this.authService.register(this.username, this.password)
      .subscribe({
        error: (error) => this.openSnackBar(error.error.message),
      })

  }

  openSnackBar(error: string, durationInSeconds=5) {
    this._snackBar.open(
      error,
      'x',
      {
        duration: durationInSeconds * 1000,
        panelClass: ['alert'],
      },

    )
  }
}
