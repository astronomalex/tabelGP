import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import * as NormsActions from '../../norms/store/norms.action';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Report} from '../../report/report.model';
import {Norma} from '../../report/norma.model';
import {environment} from '../../../environments/environment';

@Injectable()
export class NormsEffects {
  @Effect()
  fetchNorms = this.actions$.pipe(
    ofType(NormsActions.FETCH_NORMS),
    withLatestFrom(this.store.select('auth')),
    switchMap(([actionData, authState]) => {
      const baseUrl = environment.apiUrl;
      const url: string = baseUrl + 'norms';
      return this.httpClient.get<{ [machine: string]: Norma[] }>(url).pipe(
        map(norms => {
          return norms;
        }),
        map(norms => {
          console.log(norms);
          return new NormsActions.SetNorms(norms ? norms : {});
        })
      );
    })
  );

  @Effect({dispatch: false})
  storeNorms = this.actions$.pipe(
    ofType(NormsActions.STORE_NORMS),
    withLatestFrom(this.store.select('norms')),
    withLatestFrom(this.store.select('auth')),
    switchMap(([[actionData, normsState], authState]) => {
      const baseUrl = environment.apiUrl;
      const url: string = baseUrl + 'norms/save';
      return this.httpClient.post(url, normsState.allNorms);
    })
  );


  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
