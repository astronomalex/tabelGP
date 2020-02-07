import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SmenListComponent} from './tabel/smen-list/smen-list.component';
import {SmenEditComponent} from './tabel/smen-list/smen-edit/smen-edit.component';



const routes: Routes = [
  {path: '', redirectTo: '/smen-list', pathMatch: 'full'},
  {path: 'smen-list', component: SmenListComponent, children: [
      {path: 'new', component: SmenEditComponent}
    ] }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
