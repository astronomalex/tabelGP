import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SmenEditComponent} from './tabel/smen-edit/smen-edit.component';
import {SmenListStartComponent} from './tabel/smen-list/smen-list-start/smen-list-start.component';
import {SmenaDetailComponent} from './tabel/smena-detail/smena-detail.component';
import {TabelComponent} from './tabel/tabel.component';



const routes: Routes = [
  {path: '', redirectTo: '/smen-list', pathMatch: 'full'},
  {path: 'smen-list', component: TabelComponent, children: [
      {path: '', component: SmenListStartComponent},
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
