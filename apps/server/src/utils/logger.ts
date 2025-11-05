import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, _res: Response, next: NextFunction) {
  const { ip, method, url, httpVersion, headers } = req;
  const userAgent = headers['user-agent'];

  const message = `${ip} [${method}] ${url} HTTP/${httpVersion} ${userAgent}`;

  console.log(message);
  next();
}
