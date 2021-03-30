import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { method, path } = req;
    const timestamp = new Date().toLocaleString();
    console.log(`${method} ${path} ${timestamp}`);
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      console.log(`data:\n` + JSON.stringify(req.body));
    }
    if (req.cookies) {
      console.log(`cookies:\n` + JSON.stringify(req.cookies));
    }
    console.log(`\n`);
    next();
  }
}
