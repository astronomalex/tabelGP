import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SmenListComponent } from './tabel/smen-list/smen-list.component';
import { WorkerListComponent } from './workers/worker-list/worker-list.component';
import { SmenEditComponent } from './tabel/smen-edit/smen-edit.component';
import { SmenaItemComponent } from './tabel/smen-list/smena-item/smena-item.component';
import { SmenListStartComponent } from './tabel/smen-list/smen-list-start/smen-list-start.component';
import { SmenaDetailComponent } from './tabel/smena-detail/smena-detail.component';
import { TabelComponent} from './tabel/tabel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { WorkerDataEditComponent } from './workers/worker-data-edit/worker-data-edit.component';
import { WorkerListStartComponent } from './workers/worker-list/worker-list-start/worker-list-start.component';
import { WorkerDetailComponent } from './workers/worker-detail/worker-detail.component';
import { WorkersComponent } from './workers/workers.component';
import { WorkerItemComponent } from './workers/worker-list/worker-item/worker-item.component';
import { AuthComponent } from './auth/auth.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import {AlertComponent} from './shared/alert/alert.component';
import {WorkerListService} from './workers/worker-list/worker-list.service';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {WorkerSelectDialogListComponent} from './tabel/smen-edit/worker-select-dialog/worker-select-dialog-list-component';
import { StoreModule } from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

import * as fromApp from './store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/store/auth.effect';
import {WorkersEffects} from './workers/store/workers.effects';
import {TabelEffects} from './tabel/store/tabel.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DATE_LOCALE,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import { ReportEditComponent } from './report/report-edit/report-edit.component';
import { ReportDetailComponent } from './report/report-detail/report-detail.component';
import { ReportListComponent } from './report/report-list/report-list.component';
import { ReportsComponent } from './report/reports/reports.component';
import { ReportsStartComponent } from './report/reports-start/reports-start.component';
import { ReportItemComponent } from './report/report-list/report-item/report-item.component';
import {DatePipe} from '@angular/common';
import { WorkUnitListComponent } from './report/report-edit/work-unit-list/work-unit-list.component';
import { WorkUnitItemComponent } from './report/report-edit/work-unit-list/work-unit-item/work-unit-item.component';
import { NormsComponent } from './norms/norms.component';
import { NormListComponent } from './norms/norm-list/norm-list.component';
import { NormEditComponent } from './norms/norm-edit/norm-edit.component';
import { NormDetailComponent } from './norms/norm-detail/norm-detail.component';
import { NormItemComponent } from './norms/norm-list/norm-item/norm-item.component';
import {ReportEffects} from './report/store/report.effects';
import {ReportService} from './report/report.service';
import { NormsStartComponent } from './norms/norms-start/norms-start.component';
import {NormsEffects} from './norms/store/norms.effects';

@NgModule({
  declarations: [
    AppComponent,
    SmenListComponent,
    WorkerListComponent,
    SmenEditComponent,
    SmenaItemComponent,
    SmenListStartComponent,
    SmenaDetailComponent,
    TabelComponent,
    HeaderComponent,
    DropdownDirective,
    WorkerDataEditComponent,
    WorkerListStartComponent,
    WorkerDetailComponent,
    WorkersComponent,
    WorkerItemComponent,
    AuthComponent,
    PlaceholderDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    WorkerSelectDialogListComponent,
    ReportEditComponent,
    ReportDetailComponent,
    ReportListComponent,
    ReportsComponent,
    ReportsStartComponent,
    ReportItemComponent,
    WorkUnitListComponent,
    WorkUnitItemComponent,
    NormsComponent,
    NormListComponent,
    NormEditComponent,
    NormDetailComponent,
    NormItemComponent,
    NormsStartComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    EffectsModule.forRoot([AuthEffects, WorkersEffects, TabelEffects, ReportEffects, NormsEffects]),
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  entryComponents: [
    AlertComponent,
    WorkerSelectDialogListComponent
  ],
  providers: [
    DatePipe,
    ReportService,
    WorkerListService,
    {provide: MAT_DATE_LOCALE, useValue: 'ru-Ru'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
