import { Component, OnInit } from '@angular/core';
import {PopoverController} from "@ionic/angular";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  // on ajoute MenuComponent à home.modue.ts
  // le HomeComponent transmet des infos au menu  myprop
  critere_tri ;


  critere_selected ;



  constructor(private popover :PopoverController) { }

  ngOnInit() {}

  //la methode dismiss renverra la valeur de event au HomeComponent
  closePopover(event) {this.popover.dismiss(event) ;}

}

