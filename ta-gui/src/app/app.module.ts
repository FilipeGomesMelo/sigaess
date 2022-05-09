import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Auth } from "@angular/fire/auth";
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetasComponent } from './metas/metas.component';
import { AlunosComponent } from './alunos/alunos.component';
import { PessoaService } from './pessoa.service';
import { CadeirasComponent } from './cadeiras/cadeiras.component';
import { CadeiraService} from './cadeiras.service';
import { CriarCadeiraComponent } from './criar-cadeira/criar-cadeira.component'
import { ProfComponent } from './prof/prof.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginService } from './login.service';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [
    AppComponent,
    MetasComponent,
    ProfComponent,
    AlunosComponent,
    CadastroComponent,
    CadeirasComponent,
    CriarCadeiraComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Auth,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    RouterModule.forRoot([
      {
        path: 'professores',
        component: ProfComponent
      },
      {
        path: 'alunos',
        component: AlunosComponent
      },
      {
        path: 'cadastro',
        component: CadastroComponent
      },
      {
        path: 'metas',
        component: MetasComponent
      },
      {
        path: "cadeiras",
        component: CadeirasComponent
      },
      { 
        path: "criarCadeira",
        component: CriarCadeiraComponent
      },
      { 
        path: "perfil",
        component: PerfilComponent
      },
      { 
        path: "login",
        component: AppComponent
      }
    ])
  ],
  providers: [PessoaService, CadeiraService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
