import {Component, OnInit, ViewChild} from '@angular/core';
import DateTimeFormat = Intl.DateTimeFormat;
import {MessageService} from '../message/message.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute} from "@angular/router";



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
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss']
})
export class CoursComponent implements OnInit {
  //displayedColumns ,précise les colonnes qui vont être attendues par Angular lorsqu’il va remplir chaque ligne de données.
  displayedColumns: string[] = ['nom_cours','nb_topics','nb_posts','date_dernier_message']; //les noms li hna homa les noms li f base de donnée
  dataSource = new MatTableDataSource<Cours>() ; //ELEMENT_DATA;
  @ViewChild(MatPaginator) paginator: MatPaginator ;
  @ViewChild(MatSort) sort: MatSort ;
  constructor(private messageService: MessageService , private route :ActivatedRoute) {}
  ngOnInit(): void {
    this.messageService.sendMessage('getCours',null).subscribe(
      (listeCours ) => {
          this.dataSource.data = listeCours.data ;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort ;
          console.log(listeCours);
          console.log(listeCours.data);
      }
    );
  }
}
