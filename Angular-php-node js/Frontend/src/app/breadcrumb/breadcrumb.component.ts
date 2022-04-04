import {Component, Input, OnInit} from '@angular/core';

export interface BreadcrumbData {
  nom:   string ;
  route: string ;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {


  // le parent TopicsComponent passe dans son html la donnée breadcrumb à l'enfant BreadcrumbComponent qui la récupère dans son champ @Input paths dans son ts
  //la donnée breadcrumb est un champs declaré dans le constructeur TopicsComponent   et initalisé dans le ngOnInit() du parent TopicsComponent (en ts)
  @Input() paths : BreadcrumbData[] ; //faites en sorte que la classe BreadcrumbComponent récupère un tableau de BreadcrumbData de son parent
  constructor() { }

  ngOnInit(): void {
  }

}
