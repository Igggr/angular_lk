import { User } from "./user";

export type LoginDto = Pick<User, 'username' | 'password'>;