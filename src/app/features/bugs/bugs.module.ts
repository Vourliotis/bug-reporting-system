import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBugComponent } from './create-bug/create-bug.component';
import { EditBugComponent } from './edit-bug/edit-bug.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContentComponent } from './content/content.component';



@NgModule({
  declarations: [CreateBugComponent, EditBugComponent, ContentComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CreateBugComponent, EditBugComponent, ContentComponent
  ]
})
export class BugsModule { }
