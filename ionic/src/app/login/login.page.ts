import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "../message/message.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {AlertController} from '@ionic/angular';





export interface PhpData
{
  status : string ;
  data : any ;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errorMessagebool : boolean = true  ;
  errorMessage1 : string = ""  ;

  log = "" ;
  pwd = "" ;
  fdata = new FormData() ;




  //dependency injection de MessageService
  constructor(private authService :AuthService ,private router :Router,private alertController :AlertController)
  {


  }

  ngOnInit(): void {

  }

  aff_console18()
  {
    console.log(this.log,this.pwd);
  }

  aff_message_err_19()
  {

    //console.log(this.log,this.pwd) ;
    if(this.log == "" )
    {
      this.errorMessage1 = "login" ;
    }
    else
    {
      this.errorMessage1 = "" ;

    }
    if (this.pwd == "")
    {
        if(this.errorMessage1.length != 0)
        {
          this.errorMessage1 += " & " ;
        }
        this.errorMessage1 += "password" ;
    }

    //on appelle la méthode ici on fait subscribe ici pas dans le ngOnInit ,d'accord
    //là où on appelle la fct de service ,on met le subscribe aussi
    this.authService.sendAuthentication(this.log,this.pwd).subscribe(
        (message) =>{ // il faut faire une callback ici (parametres) => {body}
            console.log(message) ;
            this.authService.finalizeAuthentication(message) ;

            //const idu = message.data ;
            if(this.authService.connecté)
            {
              this.router.navigateByUrl('cours');
            }
            else
            {
              if (this.errorMessage1.length != 0)  this.errorMessage1 = 'vous n\'avez pas remplis '+this.errorMessage1
              else this.errorMessage1 = "login/password invalide" ;
              this.openAlert() ;
            }
        }
      )

  }

  async openAlert()
  {

    const monMessage = this.errorMessage1 ;
    const alert = await this.alertController.create({
      header :'Erreur' ,
      message : monMessage ,
      buttons :['Ok'] ,
    }) ;
    await alert.present() ; // affiche le popup de l'alerte
    await alert.onDidDismiss() ; //eventuellement faire une action si on ferme l'alerte
  }

}


