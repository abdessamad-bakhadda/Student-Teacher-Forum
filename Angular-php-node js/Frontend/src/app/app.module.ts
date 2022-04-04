import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { CoursComponent } from './cours/cours.component';
import {MatTableModule} from '@angular/material/table'; // Chaque fois que vous utilisez des composants d’Angular Material, il faut importer des modules dans app.module.ts voir dans API quoi importer
import {MatPaginatorModule} from "@angular/material/paginator"; // Chaque fois que vous utilisez des composants d’Angular Material, il faut importer des modules dans app.module.ts voir dans API quoi importer
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSortModule} from "@angular/material/sort";
import { TopicsComponent } from './topics/topics.component';
import { PostsComponent } from './posts/posts.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';// Chaque fois que vous utilisez des composants d’Angular Material, il faut importer des modules dans app.module.ts voir dans API quoi importer
import {RouterModule} from "@angular/router";
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { CreateTopicDialogComponent } from './create-topic-dialog/create-topic-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import { CreatePostComponent } from './create-post/create-post.component';
import { CreatePostDialogComponent } from './create-post-dialog/create-post-dialog.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    CoursComponent,
    TopicsComponent,
    PostsComponent,
    BreadcrumbComponent,
    CreateTopicComponent,
    CreateTopicDialogComponent,
    CreatePostComponent,
    CreatePostDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule ,
    FormsModule ,
    MatTableModule , //(see API docs)  : Chaque fois que vous voyez API docs des composants d’Angular Material, il faut importer le modules dans app.module.ts ,voir dans API quoi importer
    MatPaginatorModule , //(see API docs)  : Chaque fois que vous voyez API docs des composants d’Angular Material, il faut importer le modules dans app.module.ts , voir dans API quoi importer
    BrowserAnimationsModule ,
    MatSortModule , //(see API docs)  : Chaque fois que vous voyez API docs des composants d’Angular Material, il faut importer le modules dans app.module.ts , voir dans API quoi importer
    MatButtonModule , //(see API docs)  : Chaque fois que vous voyez API docs des composants d’Angular Material, il faut importer le modules dans app.module.ts , voir dans API quoi importer
    MatDialogModule ,
    MatFormFieldModule ,
    CKEditorModule ,


  ],
  entryComponents : [
    CreateTopicDialogComponent
  ],
  providers: [{ provide: MatDialogRef, useValue: {} },{ provide: MAT_DIALOG_DATA, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
