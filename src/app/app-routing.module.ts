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
import {ReportsComponent} from './report/reports/reports.component';
import {ReportsStartComponent} from './report/reports-start/reports-start.component';
import {ReportEditComponent} from './report/report-edit/report-edit.component';
import {ReportDetailComponent} from './report/report-detail/report-detail.component';
import {NormsComponent} from './norms/norms.component';
import {ReportResolverService} from './report/report-resolver.service';
import {NormsStartComponent} from './norms/norms-start/norms-start.component';
import {NormEditComponent} from './norms/norm-edit/norm-edit.component';
import {NormDetailComponent} from './norms/norm-detail/norm-detail.component';
import {NormsResolverService} from './norms/norms-resolver.service';
import {NormListComponent} from './norms/norm-list/norm-list.component';



const routes: Routes = [
  {path: '', redirectTo: '/smen-list', pathMatch: 'full'},
  {path: 'smen-list', component: TabelComponent,
    resolve: [NormsResolverService, SmenListResolverService, WorkerListResolverService, ReportResolverService],
    canActivate: [AuthGuard], children: [
      {path: '', component: SmenListStartComponent},
      {path: 'new', component: SmenEditComponent},
      {path: ':id', component: SmenaDetailComponent},
      {path: ':id/edit', component: SmenEditComponent}
    ] },
  {path: 'reports', component: ReportsComponent,
    resolve: [NormsResolverService, SmenListResolverService, WorkerListResolverService, ReportResolverService],
    canActivate: [AuthGuard], children: [
      {path: '', component: ReportsStartComponent},
      {path: 'new', component: ReportEditComponent},
      {path: ':id', component: ReportDetailComponent},
      {path: ':id/edit', component: ReportEditComponent}
    ] },
  {path: 'worker-list', component: WorkersComponent,
    resolve: [NormsResolverService, SmenListResolverService, WorkerListResolverService, ReportResolverService],
    canActivate: [AuthGuard], children: [
      {path: '', component: WorkerListStartComponent},
      {path: 'new', component: WorkerDataEditComponent},
      {path: ':id', component: WorkerDetailComponent},
      {path: ':id/edit', component: WorkerDataEditComponent}
    ]},
  {path: 'norm-list', component: NormsComponent,
    resolve: [NormsResolverService, SmenListResolverService, WorkerListResolverService, ReportResolverService],
    canActivate: [AuthGuard], children: [
      {path: '', component: NormsStartComponent},
      {path: ':machine', component: NormsStartComponent},
      {path: ':machine/new', component: NormEditComponent},
      {path: ':machine/:groupDiff', component: NormDetailComponent},
      {path: ':machine/:groupDiff/edit', component: NormEditComponent}
    ] },
  {path: 'auth', component: AuthComponent}
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
