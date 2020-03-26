import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import * as fromApp from '../../store/app.reducer';
import * as WorkersActions from '../../workers/store/workers.actions';
import {WorkerData} from '../worker-list/worker-data.model';

@Injectable()
export class WorkersEffects {
  @Effect()
  fetchWorkers = this.actions$.pipe(
    ofType(WorkersActions.FETCH_WORKERS),
    switchMap(() => {
      return this.http.get<WorkerData[]>(
        'https://ng-tabelgp.firebaseio.com/workers.json'
      );
    }),
    map(workers => {
      return workers.map(wrk => {
        return {
          ...wrk
        };
      });
    }),
    map(workers => {
      return new WorkersActions.SetWorkers(workers);
    })
  );

  @Effect({dispatch: false})
  storeWorkers = this.actions$.pipe(
    ofType(WorkersActions.STORE_WORKERS),
    withLatestFrom(this.store.select('workers')),
    switchMap(([actionData, workersState]) => {
      return this.http.put(
        'https://ng-tabelgp.firebaseio.com/workers.json',
        workersState.workers
      );
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private http: HttpClient
    ) {}
}
