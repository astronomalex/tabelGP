import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import {Report} from '../../report.model';
import {WorkerData} from '../../../workers/worker-list/worker-data.model';
import {getWorkers} from '../../../store/selectors/app.selector';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.css']
})
export class ReportItemComponent implements OnInit, OnDestroy {
  @Input() report: Report;
  @Input() index: number;
  private ngUnsubscribe$ = new Subject();
  allWorkerDatas: WorkerData[] = [];
  workerDatas: WorkerData[] = [];
  allWorkerDatas$ = this.store.pipe(select(getWorkers)).pipe(
    takeUntil(this.ngUnsubscribe$)
  ).subscribe(workers => {
    this.allWorkerDatas = workers;
  });

  constructor(
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    for (const worker of this.report.workerListReport) {
      this.workerDatas.push(this.allWorkerDatas.find(wrkr => wrkr.tabelNum === worker.tbNum));
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onItemClick(payload: number) {
    // this.store.dispatch()
  }
}
