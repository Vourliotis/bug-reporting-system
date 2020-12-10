import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBugComponent } from './bugs/create-bug/create-bug.component';
import { EditBugComponent } from './bugs/edit-bug/edit-bug.component';
import { ContentComponent } from './wrapper/content/content.component';

const routes: Routes = [
  { path: "", component : ContentComponent},
  { path: "create-bug", component : CreateBugComponent},
  { path: "edit-bug/:id", component : EditBugComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
