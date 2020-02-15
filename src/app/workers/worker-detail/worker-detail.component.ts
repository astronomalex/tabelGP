import { Component, OnInit } from '@angular/core';
import {WorkerData} from '../worker-list/worker-data.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WorkerListService} from '../worker-list/worker-list.service';

@Component({
  selector: 'app-worker-detail',
  templateUrl: './worker-detail.component.html',
  styleUrls: ['./worker-detail.component.css']
})
export class WorkerDetailComponent implements OnInit {
  id: number;
  wrk: WorkerData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workerListService: WorkerListService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.wrk = this.workerListService.getWorkerById(this.id);
      }
    );
  }

  onEditWorkerData() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteWorkerData() {
    this.workerListService.deleteWorker(this.id);
    this.router.navigate(['worker-list']);
  }

}
