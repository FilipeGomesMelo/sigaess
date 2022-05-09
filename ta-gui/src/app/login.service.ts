import { Injectable } from '@angular/core';
import { Pessoa } from '../../../common/pessoa';
import { fbAuth } from './auth/auth';

@Injectable()
export class LoginService {
  constructor(private autorizador: fbAuth) {}

  type: string = '';
  account: Pessoa = undefined;


  getAccount(): Pessoa {
    var user = this.autorizador.verifyUser();
    this.account = user;
    this.type = user.role;
    return this.account;
  }

  getType(): string{
    return this.type;
  }
}
