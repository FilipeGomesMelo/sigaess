import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Pessoa } from '../../../common/pessoa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";
import { Firestore, doc, getDoc, collection, addDoc} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient, private _route: Router, private auth: Auth, private db: Firestore) {}
  type: string = '';
  account: Pessoa = undefined;

  async criar(a: Pessoa) {
    var result: string;
    await createUserWithEmailAndPassword(this.auth, a.email, a.senha).then(res => {
        result = 'success';
        this.post(a);
      })
      .catch(err => {
        console.log('deu erro');
        result = err.message;
      });
    console.log(result);
    return result;
  }

  getType(): string {
    return this.type;
  }

  getAccount(): Pessoa {
    return this.account;
  }

  // LOG OUT METHOD
  logout() {
      signOut(this.auth);
  };

  // LOGIN
  async login(email: string, password: string) : Promise<string> {
      var result: string;
      await signInWithEmailAndPassword(this.auth, email, password).then(res => {
          var optp = res.operationType;
          if (optp === 'signIn'){
            result = 'success';
          }
      })
      .catch(err => {
          result = err.message;
      });
      return result;
  }

  post (person: Pessoa) {
      var data = this.toFirestore(person)
      addDoc(collection(this.db,'pessoa'), data).then(() => console.log("Data successfully stored"));
  }

  async get (person)  { 
      var data;
      const pessoaref = doc(this.db,'pessoa',person.uid);
      const docSnap = await getDoc(pessoaref);
      if (docSnap.exists()){
          data = this.fromFirestore(docSnap.data());
          return data;
      } else {
          return 'fail'
      }
  }

  toFirestore(person: Pessoa): object {
    return {
      'uid': person.uid,
      'name': person.name,
      'email': person.email,
      'role': person.role,
      'horarios': JSON.stringify(person.horarios)
    };
  }

  fromFirestore(data: object): Pessoa {
    return new Pessoa(data['uid'], data['name'], data['email'], data['role'], data['horarios']);
  }
}
