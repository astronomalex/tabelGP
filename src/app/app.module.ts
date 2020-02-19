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
import {SmenListService} from './tabel/smen-list/smen-list.service';
import {WorkerListService} from './workers/worker-list/worker-list.service';
import {AuthInterceptorService} from './auth/auth-interceptor.service';

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
    AlertComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    AlertComponent
  ],
  providers: [
    SmenListService,
    WorkerListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
