import {Component, OnDestroy, OnInit} from '@angular/core';
import {WorkerData} from '../worker-list/worker-data.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WorkerListService} from '../worker-list/worker-list.service';
import * as WorkersActions from '../../workers/store/workers.actions';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-worker-detail',
  templateUrl: './worker-detail.component.html',
  styleUrls: ['./worker-detail.component.css']
})
export class WorkerDetailComponent implements OnInit, OnDestroy {
  id: number;
  wrk: WorkerData;
  subscription: Subscription;
  workers: Observable<{workers: WorkerData[]}>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workerListService: WorkerListService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    this.route.params.pipe(map(params => {
        return +params.id;
      }), switchMap(id => {
        this.id = id;
        return this.store.select('workers');
      }),
      map(workersState => {
        return workersState.workers.find((wrk, index) => {
          return index === this.id;
        });
      })).subscribe(
      worker => {
        this.wrk = worker;
      });
  }

  onEditWorkerData() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteWorkerData() {
    this.store.dispatch(new WorkersActions.DeleteWorkerData(this.id));
    // this.workerListService.deleteWorker(this.id);
    this.router.navigate(['worker-list']);
  }

  ngOnDestroy(): void {
  }

}
