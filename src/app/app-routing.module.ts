import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './features/bugs/content/content.component';
import { CreateBugComponent } from './features/bugs/create-bug/create-bug.component';
import { EditBugComponent } from './features/bugs/edit-bug/edit-bug.component';

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
