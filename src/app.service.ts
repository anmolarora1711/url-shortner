import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    return 'OK';
  }

  getInfo(): object {
    return {
      name: 'URL Shortner API',
      version: '1.0.0',
      author: 'Anmol Arora',
    };
  }
}
