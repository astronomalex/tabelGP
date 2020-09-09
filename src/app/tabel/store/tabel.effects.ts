import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as TabelActions from './tabel.actions';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Smena} from '../smen-list/smena.model';


@Injectable()
export class TabelEffects {
  @Effect()
  fetchSmens = this.actions$.pipe(
    ofType(TabelActions.FETCH_SMENS),
    withLatestFrom(this.store.select('auth')),
    switchMap(([actionData, authState]) => {
        const url: string = 'https://ng-tabelgp.firebaseio.com/' + authState.locId + '_smens.json';
        return this.http.get<Smena[]>(url).pipe(
          map(smens => {
            if (smens) {
              return smens.map(smena => {
                return {
                  ...smena,
                  workersTime: smena.workersTime ? smena.workersTime : []
                };
              });
            } else {
              return [];
            }

          }),
          map(smens => {
            console.log(smens);
            return new TabelActions.SetSmens(smens);
          })
        );
      }
    )
  );

  @Effect({dispatch: false})
  storeSmens = this.actions$.pipe(
    ofType(TabelActions.STORE_SMENS),
    withLatestFrom(this.store.select('tabel')),
    withLatestFrom(this.store.select('auth')),
    switchMap(([[actionData, tabelState], authState]) => {
      const url = 'https://ng-tabelgp.firebaseio.com/' + authState.locId + '_smens.json';
      return this.http.put(url, tabelState.smens);
    })
  );


  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {
  }
}
