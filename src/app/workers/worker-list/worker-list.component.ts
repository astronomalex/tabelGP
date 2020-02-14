import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SmenListService} from '../../tabel/smen-list/smen-list.service';
import {WorkerListService} from './worker-list.service';
import {WorkerData} from './worker-data.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css']
})
export class WorkerListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  workers: WorkerData[];

  constructor(
      private smenListService: SmenListService,
      private workerListService: WorkerListService,
      private router: Router,
      private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.subscription = this.workerListService.workersChanged.subscribe(
      (workers: WorkerData[]) => {
        this.workers = workers;
    });
    this.workers = this.workerListService.getWorkers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewWorker() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
