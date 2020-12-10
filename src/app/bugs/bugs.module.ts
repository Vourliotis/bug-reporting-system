import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBugComponent } from './create-bug/create-bug.component';
import { EditBugComponent } from './edit-bug/edit-bug.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [CreateBugComponent, EditBugComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    CreateBugComponent, EditBugComponent
  ]
})
export class BugsModule { }
