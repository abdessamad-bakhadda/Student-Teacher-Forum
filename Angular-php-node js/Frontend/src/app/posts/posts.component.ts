import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MessageService} from "../message/message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BreadcrumbData} from "../breadcrumb/breadcrumb.component";



export interface Post
{
  //les noms li hna homa les noms li f base de donnée
  id : number ;
  titre : string ;
  message : string ;
  date_message : Date ;
  id_topic : number ;

}

export interface Post2
{
  tab : Post[] ;
  idc : number ;
  nom_cours : string ;
  nom_utilisateur : string ;
  Sujet : string ;

}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit
{

  //displayedColumns ,précise les colonnes qui vont être attendues par Angular lorsqu’il va remplir chaque ligne de données.
  displayedColumns: string[] = ['tab']; //les noms li hna homa les noms li f base de donnée
  dataSource = new MatTableDataSource<Post>() ; //ELEMENT_DATA;

  @ViewChild(MatPaginator) paginator: MatPaginator ;
  @ViewChild(MatSort) sort: MatSort ;

  constructor(private messageService: MessageService,private route :ActivatedRoute ,private router :Router) {}

  breadcrumb : BreadcrumbData[] ;//le parent du breadcrumb est la classe PostsComponent dans le TP 7
  idTopic ;

  nom_utilisateur ;


  onCreatePost()
  {
    this.ngOnInit() ; //poser la question au prof , est ce que c'est comme ça ?
  }

  ngOnInit(): void
  {

    const idt = this.route.snapshot.paramMap.get('idt') ;
    console.log(idt) ;
    this.idTopic = idt ;

    //remplissez breadcrumb dans votre méthode ngOnInit

    this.messageService.sendMessage('getPosts',{'id_topic':idt}).subscribe(

      (listePosts) =>{

        if(listePosts.data.tab != null)
        {
          const idc = listePosts.data.idc ;
          console.log(listePosts) ;
          console.log(listePosts.data.tab) ;
          console.log(listePosts.data.idc) ;
          console.log(listePosts.data.nom_cours) ;
          console.log(listePosts.data.Sujet) ;


          this.dataSource.data = listePosts.data.tab ; //that's why element is a Post2
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort ;

          this.nom_utilisateur = listePosts.data.nom_utilisateur ;

          // breadcrumb se remplira ici
          this.breadcrumb = [
            { nom: 'Tous les cours',     route: '/cours'}, // faut mettre idc au lieu de idc comment regler le prob de slash et de url qui s'ajoute sur autre // route: '/cours'+idc
            { nom: listePosts.data.nom_cours ,     route: '/topics/'+idc},
            { nom: listePosts.data.Sujet,     route: ''},
          ] ;
        }
        else
        {
          this.router.navigateByUrl('/login') ;
        }


      }
    ) ;
  }

}





