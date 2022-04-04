import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../message/message.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.scss']
})
export class CreatePostDialogComponent implements OnInit {

  public Editor = ClassicEditor;
  message_erreur :string = "" ;
  constructor(public dialogRef: MatDialogRef<CreatePostDialogComponent> ,
              @Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(MessageService) private messageService: MessageService) {}



  onNoClick(): void {
    this.dialogRef.close({id_post:-1,post:"on a fermé"}); //"on a fermé" recuperé par result
  }


  ngOnInit(): void {
  }

  // to remove <p></p> from data returned b editor ,yes it works
  ckEditorRemoveTags (data) {
    return data .replace('<p>', '') .replace('</p>', '') .replace('<figure class="image">', ',') .replace('<img src="', '') .replace('"></figure>', '') ;
  }

  onClick()
  {
    this.messageService.sendMessage('saveNewPost',{'nv_post':'' ,'message' :this.ckEditorRemoveTags(this.data.message),'id_topic':this.data.idt}).subscribe(

      (listePosts) => {

        console.log(listePosts) ;
        if (listePosts['status'] == 'error')
        {
          this.message_erreur = listePosts.data.reason ;
        }
        else
        {
          const idp = listePosts.data ;
          const post = this.ckEditorRemoveTags (this.data.message) ; // to remove <p></p> ,yes it works
          console.log(idp,post) ;
          this.dialogRef.close({id_post:idp,post:post}); //{id_post:ids,post:post} recupéré par result
        }
      });
  }

}
