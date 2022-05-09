import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../../../../common/pessoa';


@Component({  
  selector: 'app-root',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  constructor(private _route: Router, private pessoaService: PessoaService) {}

  aluno: Pessoa = new Pessoa();

  async logarAluno(a: Pessoa): Promise<void> {
    var result = this.pessoaService.login(a.email, a.senha); 
    if (await result === 'success') {
      await this.pessoaService.getPessoaWithEmail(a.email)
      alert("Login efetuado! Seja bem vindo!");
      this._route.navigate(['cadeiras']);
    } else {
      alert("Falhas nas credenciais, tente novamente");
    }
  }


  ngOnInit(): void {
  }
}