import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { LOGIN_PATH, REGISTRATION_PATH, BACKEND_URL, CURRENT_USER } from '../const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly client: HttpClient,
  ) { }
  
  login(username: string, password: string) {
    return this.client.post<any>(`${BACKEND_URL}/${LOGIN_PATH}`, {
      username,
      password,
    }).pipe(
      map((user) => {
        if (user && user.token) {
          localStorage.setItem(CURRENT_USER, JSON.stringify(user));
        }
        return user;
      }),
      catchError(this.handleError)
    )
  }

  register(username: string, password: string) {
    return this.client.post<any>(`${BACKEND_URL}/${REGISTRATION_PATH}`, {
      username, password
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError(`Client-side or network error occurred ${error.error.message}`);
    } else {
      console.log(error)
      return throwError(error.error.message);
    }
  }

  logout() {
    console.log('log out');
    localStorage.removeItem(CURRENT_USER);
  }

  get isAutenticated() {
    if (localStorage.getItem(CURRENT_USER)) {
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    const user = localStorage.getItem(CURRENT_USER);
    if (user === null) {
      return;
    }
    const currentUser = JSON.parse(user);
    return currentUser.token;
  }
}
