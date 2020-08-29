import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Norma} from '../../report/norma.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {ActivatedRoute, Router} from '@angular/router';
import {getNormsFromState} from '../../store/selectors/app.selector';


@Component({
  selector: 'app-norm-list',
  templateUrl: './norm-list.component.html',
  styleUrls: ['./norm-list.component.css']
})
export class NormListComponent implements OnInit {
  normsObs: Observable<{[machine: string]: Norma[] }>;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.normsObs = this.store.select(getNormsFromState);
  }

  onNewNorma

}
