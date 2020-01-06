import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SmenListComponent } from './tabel/smen-list/smen-list.component';
import { WorkerListComponent } from './workers/worker-list/worker-list.component';
import { SmenEditComponent } from './tabel/smen-list/smen-edit/smen-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SmenListComponent,
    WorkerListComponent,
    SmenEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
