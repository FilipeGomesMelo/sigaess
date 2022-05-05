import express = require('express');
import bodyParser = require("body-parser");

import {Aluno} from '../common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos';
import { CadastroDeProfs } from './cadastrodeprofs';

var taserver = express();

var alunos: CadastroDeAlunos = new CadastroDeAlunos();
var profs: CadastroDeProfs = new CadastroDeProfs();

taserver.use(bodyParser.json());
taserver.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:4200'); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

taserver.get('/alunos', function (req, res) {
  var aluno: string = JSON.stringify(alunos.getAlunos());
  res.send(aluno);
})

taserver.post('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body; //verificar se é mesmo Aluno!
  aluno = alunos.criar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser cadastrado"});
  }
})

taserver.put('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  aluno = alunos.atualizar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser atualizado"});
  }
})


taserver.get('/professores', function (req, res) {
  var aluno: string = JSON.stringify(alunos.getAlunos());
  res.send(aluno);
})

taserver.post('/professor', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body; //verificar se é mesmo Aluno!
  aluno = alunos.criar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser cadastrado"});
  }
})

taserver.put('/professor', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  aluno = alunos.atualizar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser atualizado"});
  }
})

taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})