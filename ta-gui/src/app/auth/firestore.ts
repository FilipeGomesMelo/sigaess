import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc} from '@angular/fire/firestore';

import { PersonConverter, Pessoa } from '../../../../common/pessoa';

@Injectable()
export class DbApiCalls {
    constructor(private personConverter: PersonConverter, private db: Firestore) {}

    post (person: Pessoa) {
        var data = this.personConverter.toFirestore(person)
        setDoc(doc(this.db,'pessoa',data['uid']),data).then(() => console.log("Data successfully stored"));
    }

    async get (person)  { 
        var data;
        const pessoaref = doc(this.db,'pessoa',person.uid);
        const docSnap = await getDoc(pessoaref);
        if (docSnap.exists()){
            data = this.personConverter.fromFirestore(docSnap.data());
            return data;
        } else {
            return 'fail'
        }
    }
};
