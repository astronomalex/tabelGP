import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Report} from '../report.model';

import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  reports: Observable<{ reports: Report[] }>;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.reports = this.store.select('reports');
  }

  onNewReport() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
