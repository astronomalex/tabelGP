import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {SmenListService} from '../../tabel/smen-list/smen-list.service';
import {WorkerListService} from './worker-list.service';
import {WorkerData} from './worker-data.model';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromTabel from '../../tabel/store/tabel.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css']
})
export class WorkerListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  workers: Observable<{workers: WorkerData[]}>;

  constructor(
      private smenListService: SmenListService,
      private workerListService: WorkerListService,
      private router: Router,
      private route: ActivatedRoute,
      private store: Store<fromTabel.AppState>
    ) { }

  ngOnInit() {
    this.workers = this.store.select('tabel');
    // this.subscription = this.workerListService.workersChanged.subscribe(
    //   (workers: WorkerData[]) => {
    //     this.workers = workers;
    // });
    // this.workers = this.workerListService.getWorkers();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  onNewWorker() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
