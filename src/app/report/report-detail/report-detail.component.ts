import {Component, OnDestroy, OnInit} from '@angular/core';
import {Report} from '../report.model';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import * as ReportActions from '../store/report.actions';
import {select, Store} from '@ngrx/store';
import {map, takeUntil} from 'rxjs/operators';
import {getSelectedReport, getSelectedReportWorkerDatas} from '../../store/selectors/app.selector';
import {Subject} from 'rxjs';
import {WorkerData} from '../../workers/worker-list/worker-data.model';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit, OnDestroy {
  public report: Report;
  private ngUnsubscribe$ = new Subject();
  id: number;
  workerDataList: WorkerData[] = [];
  public selectedWorkers: WorkerData[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      map(
        params => {
          return +params.id;
        }
      )
    ).subscribe(id => {
      this.id = id;
      this.store.dispatch(new ReportActions.SelectReport(id));
      }
    );
    this.store.pipe(select(getSelectedReport)).pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(
      item => this.report = item
    );
    this.store.pipe(select(getSelectedReportWorkerDatas)).pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(
      workers => this.selectedWorkers = workers
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onEditReport() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteReport() {
    this.store.dispatch(new ReportActions.DeleteReport(this.id));
    this.router.navigate(['reports']);
  }

}
