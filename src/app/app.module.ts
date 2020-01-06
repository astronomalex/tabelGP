import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SmenListComponent } from './smen-list/smen-list.component';
import { WorkerListComponent } from './worker-list/worker-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SmenListComponent,
    WorkerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
