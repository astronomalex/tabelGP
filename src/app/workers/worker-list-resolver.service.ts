import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {WorkerData} from './worker-list/worker-data.model';
import {map, switchMap, take} from 'rxjs/operators';
import {Actions, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';

import * as WorkersActions from '../workers/store/workers.actions';
import * as fromApp from '../store/app.reducer';


@Injectable({providedIn: 'root'})
export class WorkerListResolverService implements Resolve<WorkerData[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('workers').pipe(
      take(1),
      map(workerState => {
          return workerState.workers;
        }
      ),
      switchMap(workers => {
        if (workers.length) {
          this.store.dispatch(new WorkersActions.FetchWorkers());
          return this.actions$.pipe(
            ofType(WorkersActions.SET_WORKERS),
            take(1)
          );
        } else {
          return of(workers);
        }
      })
    );
  }
}
