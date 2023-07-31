import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Observable, delay, dematerialize, materialize, of, throwError } from 'rxjs';
import { LOGIN_ERROR, LOGIN_PATH, REGISTRATION_PATH, TICKET_PATH, USER_PATH } from '../const';
import { User } from '../common-types/user';
import { Ticket } from '../common-types/ticket';
import { loremContent, loremTitles } from './lorem';
import { tick } from '@angular/core/testing';

const usersKey = 'registred-users';
const users: User[] = JSON.parse(localStorage.getItem(usersKey) ?? '[]');

if (users.length === 0) {
    users.push({
        id: 1,
        username: 'admin',
        password: 'admin',
        jwt: fakeJWT(),
        tickets: createFakeTickets(),
        name: '',
        surname: '',
        birthDate: '',
        city: ''
    });
}

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const { url, method, body } = request;
        console.log(`Intercept [${method}] ${url}`);

        switch (true) {
            case url.endsWith(`/${REGISTRATION_PATH}`) && method === 'POST':
                return register();

            case url.endsWith(`/${LOGIN_PATH}`) && method === 'POST':
                return login();
            
            case url.endsWith(`/${USER_PATH}`) && method === 'GET':
                return getUserInfo();
            
            case url.endsWith(`/${USER_PATH}`) && method === 'PATCH':
                return updateUser();
            
            case url.endsWith(`/${TICKET_PATH}`) && method === 'PUT':
                return updateTicket();
            

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
                jwt: fakeJWT(),
                username,
                password,
                name: '',
                surname: '',
                birthDate: '',
                city: '',
                tickets: createFakeTickets(),
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

        function updateTicket() {
            console.log(`updating ticket ${body.ticket.id}`, body);

            const user = authenticate(body.jwt);
            if (!user) {
                return error('JWT is incorrect');
            } else {
                const ticket = user.tickets.find((t) => t.id === body.ticket.id);
                if (!ticket) {
                    return error('Ошибка, такого тикета нет в БД');
                }
                ticket.isOpened = body.ticket.isOpened;
                ticket.title = body.ticket.title;
                ticket.content = body.ticket.content;
            
                localStorage.setItem(usersKey, JSON.stringify(users));
                localStorage.setItem('current_user', JSON.stringify(user));
                return ok(user.tickets);
            }
        }


        function withoutPassword(user: User) {
            const { password: _, ...without_password } = user;
            return without_password;
        }

        function ok(body?: unknown) {
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

function ticketFactory() {
    let number = 1;

    return function createFakeTicket(): Ticket {
        return {
            id: number++,
            isOpened: Math.random() > 0.3,
            // в заголовке от 1 до 10 слов
            title: randomlyCut(choose(loremTitles)),
            content: randomlyCut(choose(loremContent)),
        }
    }
}

function randomlyCut(content: string): string {
    const words = content.split(' ');
    return words.slice(0, 1 + Math.floor(Math.random() * words.length)).join(' ');
}

function choose<T>(arr: T[]): T {
    return arr[(Math.floor(Math.random() * arr.length))];
}

function createFakeTickets(): Ticket[] {
    const ammount = Math.floor(Math.random() * 40);
    const factory = ticketFactory();
    return Array.from({ length: ammount }).map(() => factory());
}

function fakeJWT() {
    return Math.random().toString(36).substring(2);
}