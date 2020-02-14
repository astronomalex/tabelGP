import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SmenEditComponent} from './tabel/smen-edit/smen-edit.component';
import {SmenListStartComponent} from './tabel/smen-list/smen-list-start/smen-list-start.component';
import {SmenaDetailComponent} from './tabel/smena-detail/smena-detail.component';
import {TabelComponent} from './tabel/tabel.component';
import {SmenListResolverService} from './tabel/smen-list-resolver.service';
import {WorkerListComponent} from './workers/worker-list/worker-list.component';
import {WorkerListStartComponent} from './workers/worker-list/worker-list-start/worker-list-start.component';
import {WorkersComponent} from './workers/workers.component';
import {WorkerDetailComponent} from './workers/worker-detail/worker-detail.component';
import {WorkerDataEditComponent} from './workers/worker-data-edit/worker-data-edit.component';



const routes: Routes = [
  {path: '', redirectTo: '/smen-list', pathMatch: 'full'},
  {path: 'smen-list', component: TabelComponent, children: [
      {path: '', component: SmenListStartComponent},
      {path: 'new', component: SmenEditComponent},
      {path: ':id', component: SmenaDetailComponent, resolve: [SmenListResolverService]},
      {path: ':id/edit', component: SmenEditComponent, resolve: [SmenListResolverService]}
    ] },
  {path: 'worker-list', component: WorkersComponent, children: [
      {path: '', component: WorkerListStartComponent},
      {path: 'new', component: WorkerDataEditComponent},
      {path: ':id', component: WorkerDetailComponent},
      {path: ':id/edit', component: WorkerDataEditComponent}
    ]}
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
