import { Injectable } from '@angular/core';
import {MessageService} from "../message/message.service";
import {Observable} from "rxjs";
import {PhpData} from "../login/login.page";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  connecté : boolean ;
  //dependency injection de MessageService
  constructor(private messageService :MessageService) { }

  sendAuthentication(login:string , password:string) : Observable<PhpData> {
    return this.messageService.sendMessage("checkLogin", {'login': login, 'password': password}) ;
  }

  finalizeAuthentication(message:PhpData)
  {
    //console.log(message) ;
    //const idu = message.data ;
    if(message.status == "ok")
    {
      this.connecté = true ;
    }
    else
    {
      this.connecté = false ;
    }
  }


}

