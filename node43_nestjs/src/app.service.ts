import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello() {
    return 'node43 hello';
  }

  getNumber() {
    return 1 + 2
  }

}
