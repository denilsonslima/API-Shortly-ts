import { Request } from 'express';

type ReqBody = {
  url: string;
};

export type AuthenticatedRequest = Request & ReqBody;