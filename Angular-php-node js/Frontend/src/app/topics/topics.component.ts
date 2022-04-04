import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MessageService} from "../message/message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BreadcrumbData} from "../breadcrumb/breadcrumb.component";





export interface Topic
{
  //les noms li hna homa les noms li f base de donnée
  id : number ;
  Sujet : string ;
  nb_posts : number ;
  date_dernier_message : Date ;
  id_cours : number ;
  nom_cours : string ;
}

export interface Topic2
{
  tab : Topic[] ;
  idu : number ;

}

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit
{

  //displayedColumns ,précise les colonnes qui vont être attendues par Angular lorsqu’il va remplir chaque ligne de données.
  displayedColumns: string[] = ['Sujet','nb_posts','date_dernier_message']; //les noms li hna homa les noms li f base de donnée
  dataSource = new MatTableDataSource<Topic>() ; //ELEMENT_DATA;

  @ViewChild(MatPaginator) paginator: MatPaginator ;
  @ViewChild(MatSort) sort: MatSort ;

  constructor(private messageService: MessageService,private route :ActivatedRoute ,private router :Router) {}

  breadcrumb : BreadcrumbData[] ;//le parent du breadcrumb est la classe TopicsComponent dans le TP 7
  idCours : number ;

  onCreateTopic()
  {
    this.ngOnInit() ; //poser la question au prof , est ce que c'est comme ça ?
  }
  ngOnInit(): void
  {
      const idc = this.route.snapshot.paramMap.get('idc') ;
      //remplissez breadcrumb dans votre méthode ngOnInit
      this.messageService.sendMessage('getTopics',{'id_cours':idc}).subscribe(
        (listeTopics) =>{
          if(listeTopics['status'] == 'ok')
          {
              const idu = listeTopics.data.idu ;
              console.log(listeTopics) ;
              console.log(listeTopics.data.tab) ;
              console.log(listeTopics.data.idu) ;

              this.dataSource.data = listeTopics.data.tab ;
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort ;

              // breadcrumb se remplira ici
              this.breadcrumb = [
                { nom: 'Tous les cours',     route: '/cours'}, // faut mettre idu au lieu de idu comment regler le prob de slash et de url qui s'ajoute sur autre // route: '/cours'+idu
                { nom: listeTopics.data.tab[0].nom_cours , route: '' }
              ] ;
              this.idCours = listeTopics.data.tab[0].id_cours ;
          }
          else { this.router.navigateByUrl('login') ;}
        }
      ) ;
    }

}



