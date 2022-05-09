import { Injectable } from '@angular/core';
import { fbAuth } from './auth/auth';
import { Router } from '@angular/router';
import { Pessoa } from '../../../common/pessoa';

@Injectable()
export class PessoaService {
  
  constructor(private _route: Router, private autorizador: fbAuth) {}

  criar(a: Pessoa) {
    var result = this.autorizador.createUser(a.email, a.senha, a)
    return result
  }

}
