import {Component, OnInit, ViewChild} from '@angular/core';
import DateTimeFormat = Intl.DateTimeFormat;
import {MessageService} from '../message/message.service';
import {ActivatedRoute} from "@angular/router";
import {MenuComponent} from '../menu/menu.component';
import {PopoverController} from '@ionic/angular';



export interface Cours
{
  //les noms li hna homa les noms li f base de donnée
  id: number;
  nom_cours: string;
  nb_topics: number;
  nb_posts: number;
  date_dernier_message: Date; // A regler


}


/*const date_dernier_message = new Date("2021-02-17" );
const ELEMENT_DATA: Cours[] = [
  {id: 1, nom_cours: 'dars 1', nb_sujets: 5, nb_posts: 5 , date_dernier_message },
  {id: 2, nom_cours: 'dars 2', nb_sujets: 5, nb_posts: 5 , date_dernier_message },
];*/

@Component({
  selector: 'app-cours',
  templateUrl: './cours.page.html',
  styleUrls: ['./cours.page.scss']
})
export class CoursPage implements OnInit {

  tab_cours : Cours[]  ;
  trier_par :string  ;
  tri_par_nom_cours = 1;
  tri_par_date = 1;
  tri_par_nb_topics = 1;



  constructor(private messageService: MessageService , private route :ActivatedRoute,private popover :PopoverController) {}

  idu = this.route.snapshot.paramMap.get('idu') ;

  ngOnInit(): void {
    this.messageService.sendMessage('getCours',null).subscribe(
      (listeCours ) => {
        this.tab_cours = listeCours.data ;
        console.log(listeCours);
        console.log(listeCours.data);
      }
    );
  }

  /*
  trier_tab_cours(cours1,cours2) {
    if (this.trier_par == "cours") return -cours1.nom_cours.localeCompare(cours2.nom_cours);
    else if (this.trier_par == 'date') {
      if (cours1.date_dernier_message < cours2.date_dernier_message) return 1;
      else if (cours1.date_dernier_message > cours2.date_dernier_message) return -1;
      else return 0;
    }
    else if (this.trier_par == 'nb topics') return -(cours1.nb_topics - cours2.nb_topics) ;
  }
   */


  openMenu(myevent : MouseEvent) : void {
    //on créé le popup contenant le code du menu
    this.popover.create({
      component: MenuComponent, // on precise quoi inclure
      showBackdrop: true,
      cssClass: 'my-menu-class', //on peut preciser un css
      event: myevent, //l'evenement clic souris
      componentProps: { // ici on indique les propriétés que l'on veut initialiser dans le composant MenuComponent
        critere_selected: this.trier_par ,
        critere_tri : ['cours','date','nb topics'] ,
      }
    }).then((popoverElement) => {
      popoverElement.present(); // affiche le menu
      popoverElement.onDidDismiss().then((res) => {

        if(res.data != undefined)
        {
            this.trier_par = res.data;
            console.log(res,this.trier_par);
            //faut regler ca demande prof
            if (this.trier_par == "cours") this.tri_par_nom_cours *= -1;
            if (this.trier_par == 'date') this.tri_par_date *= -1;
            if (this.trier_par == 'nb topics') this.tri_par_nb_topics *= -1;


            this.tab_cours.sort((cours1, cours2) => {// il fallait faire un arrow function pour que ça marche
                if (this.trier_par == "cours") {
                  if (cours1.nom_cours < cours2.nom_cours) return this.tri_par_nom_cours;
                  else if (cours1.nom_cours > cours2.nom_cours) return -this.tri_par_nom_cours;
                  else return 0;
                } else if (this.trier_par == 'date') {
                  if (cours1.date_dernier_message < cours2.date_dernier_message) return this.tri_par_date;
                  else if (cours1.date_dernier_message > cours2.date_dernier_message) return -this.tri_par_date;
                  else return 0;
                } else if (this.trier_par == 'nb topics') {
                  if (cours1.nb_topics < cours2.nb_topics) return this.tri_par_nb_topics;
                  else if (cours1.nb_topics > cours2.nb_topics) return -this.tri_par_nb_topics;
                  else return 0;
                }
            });
          }
        });
      });

    }


}
