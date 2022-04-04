import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
import {PhpData} from "../login/login.page";



@Injectable({
  providedIn: 'root'
})
export class MessageService {


  // dependency injection de HttpClient
  constructor(private httpClient: HttpClient) {


  }


  //on aura que le sendMessage dans message.service.ts
  /*
  // here : we only send data (in a FormData) to checkLogin.php , with this.httpClient.post
  // backend en php
  sendMessage(url,data) : Observable<PhpData>
  {
      const url_complet = environment.debut_url + url + '.php';

      let fdata = new FormData() ;
      if(data != null && data != undefined)
      {
        for(const elt in data)
        {
          fdata.append(elt,data[elt]) ;
        }
      }
      else fdata = null ;
      return this.httpClient.post<PhpData>(
          url_complet ,
          fdata ,
          {withCredentials: true} //envoi les cookies(==elts) de $_SESSION == la session ,sinon les fichiers.php ne reconnaissent pas $_SESSION
        )
  }
  */

  // backend en Node /Express
  sendMessage(url,data) : Observable<PhpData>
  {
    const url_complet = environment.debut_url + url ;
    //dans les transferts d’informations vers Node/Express, on n’utilise pas les FormData, on transmet directement des objets Javascript

    return this.httpClient.post<PhpData>(
      url_complet ,
      data ,
      {withCredentials: true} //envoi les cookies(==elts) de $_SESSION == la session ,sinon les fichiers.php ne reconnaissent pas $_SESSION
    )
  }


}








