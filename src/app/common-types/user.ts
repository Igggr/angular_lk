import { Ticket } from './ticket';

export type User = {
    id: number;
    username: string;
    password: string;
    jwt: string;
    name: string;
    surname: string;
    birthDate: string;
    city: string;
    tickets: Ticket[];
};
