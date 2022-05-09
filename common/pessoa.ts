export class Pessoa {
  uid: string;
  name: string;
  email: string;
  senha: string;
  role: string;
  horarios: Map<string, Map<number, string>>;

  constructor (uid: string = "",
                name: string = "",
                email: string = "",
                role: string = "",
                horarios: Map<string, Map<number, string>> = new Map<string, Map<number, string>>()) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.role = role;
    this.horarios = horarios;
}

  clean(): void {
    this.name = "";
    this.email = "";
    this.senha = "";
    this.role = "";
    this.horarios = this.horariosInitial();
  }

  horariosInitial(): Map<string, Map<number, string>> {
    var  horarios: Map<string, Map<number, string>> = new Map<string, Map<number, string>>();
    horarios["seg"] = new Map<number, string>();
    horarios["ter"] = new Map<number, string>();
    horarios["qua"] = new Map<number, string>();
    horarios["qui"] = new Map<number, string>();
    horarios["sex"] = new Map<number, string>();
    horarios["sab"] = new Map<number, string>();
    return horarios;
  }

  cloneHorarios(): Map<string, Map<number, string>> {
    var horarios: Map<string, Map<number, string>> = new Map<string, Map<number, string>>();
    horarios = new Map(JSON.parse(JSON.stringify([...this.horarios])))
    return horarios;
  }

  copyFrom(from: Pessoa): void {
    this.name = from.name;
    this.email = from.email;
    this.role = from.role;
    this.senha = from.senha;
  }

  clone(): Pessoa {
    var pessoa: Pessoa = new Pessoa();
    pessoa.name = this.name;
    pessoa.email = this.email;
    pessoa.senha = this.senha;
    pessoa.role = this.role;
    pessoa.horarios = this.cloneHorarios();
    return pessoa;
  }

  toString() {
    return this.uid + ', ' + this.name + ', ' + this.email + ', ' + this.role + ', ' + JSON.stringify(this.horarios);
  } 
}

export class PersonConverter {
  toFirestore(person: Pessoa): object {
    return {
      uid: person.uid,
      name: person.name,
      email: person.email,
      role: person.role,
      horarios: person.horarios
    };
  }

  fromFirestore(data: object): Pessoa {
    return new Pessoa(data['uid'], data['name'], data['email'], data['role'], data['horarios']);
  }
}