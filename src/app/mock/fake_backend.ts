import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Observable, delay, dematerialize, materialize, of, throwError } from 'rxjs';
import { LOGIN_ERROR, LOGIN_PATH, REGISTRATION_PATH, USER_PATH } from '../const';
import { User } from '../common-types/user';

const usersKey = 'registred-users';
let users: User[] = JSON.parse(localStorage.getItem(usersKey)!) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, body } = request;
        console.log(`Intercept [${method}] ${url}`);

        switch (true) {
            case url.endsWith(`/${REGISTRATION_PATH}`) && method === 'POST':
                return register();

            case url.endsWith(`/${LOGIN_PATH}`) && method === 'POST':
                return login();
            
            case url.endsWith(`/${USER_PATH}`) && method == 'GET':
                return getUserInfo();
            
            case url.endsWith(`/${USER_PATH}`) && method == 'PATCH':
                return updateUser();

            default:
                // не перехваченные запросы - действительно обрабатывай
                return next.handle(request);
        }

        function login() {
            console.log('fake login');

            const { username, password } = body;
            const user = users.find(u => u.username === username && u.password === password);
            if (!user) return error(LOGIN_ERROR);

            console.log('found user', user);
            return ok(withoutPassword(user));
        }

        function register() {
            console.log('fake registration');
            const { password, username } = body;
            if (users.find(x => x.username === username)) {
                return error(`Username ${username} is already taken`);
            }

            const user: User = {
                id: users.length ? Math.max(...users.map(x => x.id)) + 1 : 1,
                jwt: Math.random().toString(36).substring(2),
                username,
                password,
                name: '',
                surname: '',
                birthDate: '',
                city: '',
                tickets: [],
            }

            users.push(user);
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok(withoutPassword(user));
        }

        function authenticate(jwt: string): User | undefined {
            return users.find((u) => u.jwt === jwt);
        }

        function getUserInfo() {
            const user = authenticate(body.jwt);

            if (user) {
                return ok(withoutPassword(user));
            } else {
                return error('JWT is incorrect');
            }
        }

        function updateUser() {
            console.log('fake update for user');

            const user = authenticate(body.jwt);

            if (user) {
                console.log('updating user', user);
                console.log('with data', body);

                user.name = body.name ?? user.name;
                user.surname = body.surname ?? user.surname;
                user.birthDate = body.birthDate ?? user.birthDate;
                user.city = body.city ?? user.city;

                console.log("Users[]:", users)
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok(withoutPassword(user));
            } else {
                return error('JWT is incorrect');
            }
        }

        function withoutPassword(user: User) {
            const { password: _, ...without_password } = user;
            return without_password;
        }

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500));
        }

        function error(message: string) {
            return throwError(() => ({ error: { message } }))
                .pipe(materialize(), delay(500), dematerialize());
            // call materialize and dematerialize to ensure delay even if an error is thrown
            // (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
} as const;