import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBugComponent } from './create-bug/create-bug.component';
import { EditBugComponent } from './edit-bug/edit-bug.component';



@NgModule({
  declarations: [CreateBugComponent, EditBugComponent],
  imports: [
    CommonModule
  ]
})
export class BugsModule { }
