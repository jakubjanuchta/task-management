import { JwtHeader, JwtPayload } from "jwt-decode";

type UserRole = 'admin' | 'devops' | 'developer';

export type User = {
    _id: string;
    name: string;
    email: string;
    sub: string;
    role: UserRole
}

export type AuthData = {
  user: JwtHeader & JwtPayload | null;
};

export type LoginCredentials = {
    email: string;
    password: string;
}