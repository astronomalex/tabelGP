import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SmenEditComponent} from './tabel/smen-edit/smen-edit.component';
import {SmenListStartComponent} from './tabel/smen-list/smen-list-start/smen-list-start.component';
import {SmenaDetailComponent} from './tabel/smena-detail/smena-detail.component';
import {TabelComponent} from './tabel/tabel.component';
import {SmenListResolverService} from './tabel/smen-list-resolver.service';
import {WorkerListStartComponent} from './workers/worker-list/worker-list-start/worker-list-start.component';
import {WorkersComponent} from './workers/workers.component';
import {WorkerDetailComponent} from './workers/worker-detail/worker-detail.component';
import {WorkerDataEditComponent} from './workers/worker-data-edit/worker-data-edit.component';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from './auth/auth.guard';
import {WorkerListResolverService} from './workers/worker-list-resolver.service';



const routes: Routes = [
  {path: '', redirectTo: '/smen-list', pathMatch: 'full'},
  {path: 'smen-list', component: TabelComponent, canActivate: [AuthGuard], children: [
      {path: '', component: SmenListStartComponent, resolve: [SmenListResolverService]},
      {path: 'new', component: SmenEditComponent},
      {path: ':id', component: SmenaDetailComponent, resolve: [SmenListResolverService]},
      // {path: ':id', component: SmenaDetailComponent},
      {path: ':id/edit', component: SmenEditComponent, resolve: [SmenListResolverService]}
      // {path: ':id/edit', component: SmenEditComponent}
    ] },
  {path: 'worker-list', component: WorkersComponent, canActivate: [AuthGuard], children: [
      {path: '', component: WorkerListStartComponent, resolve: [WorkerListResolverService]},
      {path: 'new', component: WorkerDataEditComponent},
      {path: ':id', component: WorkerDetailComponent, resolve: [WorkerListResolverService]},
      {path: ':id/edit', component: WorkerDataEditComponent,  resolve: [WorkerListResolverService]}
    ]},
  {path: 'auth', component: AuthComponent}
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
