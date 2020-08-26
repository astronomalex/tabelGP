import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Norma} from '../../report/norma.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-norm-list',
  templateUrl: './norm-list.component.html',
  styleUrls: ['./norm-list.component.css']
})
export class NormListComponent implements OnInit {
  normsObs: Observable<{ norma: Norma[] }>;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
  }

}
