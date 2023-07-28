import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backendUrl = 'localhost:3000';
  redirectUrl: string = '';

  constructor(
    private readonly client: HttpClient,
  ) { }
  
  login(username: string, password: string) {
    return this.client.post<any>(`${this.backendUrl}/login`, {
      username,
      password,
    }).pipe(
      map((user) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }),
      catchError(this.handleError)
    )
  }

  register(username: string, password: string) {
    return this.client.post<any>(`${this.backendUrl}/register`, {
      username, password
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError(`Client-side or network error occurred ${error.error.message}`);
    } else {
      return throwError(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
  }

  logout() {
    console.log('log out');
    localStorage.removeItem('currentUser');
  }

  get isAutenticated() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    const user = localStorage.getItem('currentUser');
    if (user === null) {
      return;
    }
    const currentUser = JSON.parse(user);
    return currentUser.token;
  }
}
