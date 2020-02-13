import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {SmenListService} from '../../tabel/smen-list/smen-list.service';
import {WorkerListService} from './worker-list.service';
import {WorkerData} from './worker-data.model';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css']
})
export class WorkerListComponent implements OnInit {
  subscription: Subscription;
  workers: WorkerData[];

  constructor(
      private smenListService: SmenListService,
      private workerListService: WorkerListService
    ) { }

  ngOnInit() {
    this.subscription = this.workerListService.workersChanged.subscribe(
      (workers: WorkerData[]) => {
        this.workers = workers;
    });
  }


}
