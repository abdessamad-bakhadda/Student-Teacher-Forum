import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AppComponent} from "./app.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {CoursComponent} from "./cours/cours.component";
import {TopicsComponent} from "./topics/topics.component";
import {PostsComponent} from "./posts/posts.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path : '' ,pathMatch :"full" ,redirectTo :"/login"} , //pour aller vers login quand path vide full
  //Ce qu’il faut retenir, ici, c’est que, quand on crée des composants qui correspondront à des pages, il ne faudra pas oublier de rajouter leur route dans app-routing.module.ts
  {
    path : '', // un path vide , pour que ça marche (ça marche pas pour un path non vide) et y'a pas de component après
    canActivateChild :[AuthGuard], //Avant la propriété children
    children : [
      //les routes cours et topics/:idc , soient enfants d’un path vide
      {path : 'cours' ,component : CoursComponent} ,
      {path : 'topics/:idc' ,component : TopicsComponent} ,
      {path:  'posts/:idt' ,component : PostsComponent}, // n'est pas demande par le prof ,voir prq dans les etapes prochaines
    ]
  },
  {path : 'login' ,component : LoginComponent} ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
