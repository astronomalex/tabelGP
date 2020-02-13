import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SmenListComponent } from './tabel/smen-list/smen-list.component';
import { WorkerListComponent } from './workers/worker-list/worker-list.component';
import { SmenEditComponent } from './tabel/smen-edit/smen-edit.component';
import {SmenaItemComponent} from './tabel/smen-list/smena-item/smena-item.component';
import { SmenListStartComponent } from './tabel/smen-list/smen-list-start/smen-list-start.component';
import {SmenaDetailComponent} from './tabel/smena-detail/smena-detail.component';
import {TabelComponent} from './tabel/tabel.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {HttpClientModule} from '@angular/common/http';

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
        DropdownDirective
    ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
