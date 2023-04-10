import { Request } from 'express';

type ReqBody = {
  url: string;
};
export type AuthenticatedRequest = Request & ReqBody;

export type CreateUrlParams = {
  url: string;
  shortUrl: string;
  userId: number;
};

export type CreateUser = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}

export type CreateUserParams = {
  email: string;
  password: string;
}