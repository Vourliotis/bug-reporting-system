import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBugComponent } from './create-bug/create-bug.component';
import { EditBugComponent } from './edit-bug/edit-bug.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateBugComponent, EditBugComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateBugComponent, EditBugComponent
  ]
})
export class BugsModule { }
