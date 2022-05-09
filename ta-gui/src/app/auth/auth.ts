import { Injectable } from '@angular/core';
import { Pessoa, PersonConverter } from '../../../../common/pessoa';
import { User, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";
import { DbApiCalls } from './firestore';

@Injectable()
export class fbAuth {
 constructor(private auth: Auth, private dbApiCalls: DbApiCalls, private convert: PersonConverter) { } 

    verifyUser (): Pessoa {
        var user = this.auth.currentUser;
        var pessoa_user = this.convert.fromFirestore(user);
        return pessoa_user
    }

    // SIGN UP USER
    createUser (email: string, password: string, pessoa: Pessoa) : string{
        var result: string;
        createUserWithEmailAndPassword(this.auth, email, password).then(res => {
        var uid = this.auth.currentUser.uid;
        this.dbApiCalls.post(pessoa);
        result = 'success';
        })
        .catch(err => {
            result = err.message;
        });
        return result;
    }
    

    // LOG OUT METHOD
    logout() {
        signOut(this.auth);
    };
    
    // LOGIN
    login(email: string, password: string) : string {
        var result: string;
        signInWithEmailAndPassword(this.auth, email, password).then(res => {
            result = 'success';
        })
        .catch(err => {
            result = err.message;
        });
        return result;
    }
}