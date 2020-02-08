import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SmenListComponent} from './tabel/smen-list/smen-list.component';
import {SmenEditComponent} from './tabel/smen-list/smen-edit/smen-edit.component';
import {SmenListStartComponent} from './tabel/smen-list/smen-list-start/smen-list-start.component';
import {SmenaItemComponent} from './tabel/smen-list/smena-item/smena-item.component';
import {SmenaDetailComponent} from './tabel/smen-list/smena-detail/smena-detail.component';



const routes: Routes = [
  {path: '', redirectTo: '/smen-list', pathMatch: 'full'},
  {path: 'smen-list', component: SmenListComponent, children: [
      // {path: '', component: SmenListStartComponent},
      {path: 'new', component: SmenEditComponent},
      {path: ':id', component: SmenaDetailComponent}
    ] }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
