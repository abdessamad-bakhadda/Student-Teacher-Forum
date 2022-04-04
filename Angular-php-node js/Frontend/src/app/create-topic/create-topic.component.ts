import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateTopicDialogComponent} from "../create-topic-dialog/create-topic-dialog.component";
import {BreadcrumbData} from "../breadcrumb/breadcrumb.component";

export interface DialogData {
  name: string;
  nv_sujet : string ;
  idc: number ;}

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {
  name: string = "Nouveau Sujet" ;
  nv_sujet : string ="";
  idc: number ;

  //so create_topic  est l'enfant puisque contient @Input et @Output
  @Input() id_cours : number ;
  @Output() newItemEvent = new EventEmitter<any>() ;

  private dialogRef: any ;
  constructor(public dialog: MatDialog) {}

  openDialog(id): void {
    this.dialogRef = this.dialog.open(CreateTopicDialogComponent, {
      width: '50%',
      data: {name: this.name,nv_sujet:"" ,idc: id}
    });

    this.dialogRef.afterClosed().subscribe(
      (result) => { //result recupère ce qui est envoyé dans close(...)
        console.log(result) ;
        console.log('The dialog was closed','id_cours',id);
        if(result != undefined && result.id_sujet != -1)
        {
          this.newItemEvent.emit(result);
        }
        //this.animal = result;
    });
  }
  ngOnInit(): void {
  }



}
