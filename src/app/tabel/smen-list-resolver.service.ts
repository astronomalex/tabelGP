import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {map, switchMap, take} from 'rxjs/operators';

import {Smena} from './smen-list/smena.model';
import * as fromApp from '../store/app.reducer';
import * as TabelActions from './store/tabel.actions';
import {of} from 'rxjs';


@Injectable({providedIn: 'root'})
export class SmenListResolverService implements Resolve<Smena[]> {
  constructor(
      private store: Store<fromApp.AppState>,
      private actions$: Actions
    ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('tabel').pipe(
      take(1),
      map(tabelState => {
        return tabelState.smens;
        }
      ),
      switchMap(smens => {
        if (smens.length) {
          this.store.dispatch(new TabelActions.FetchSmens());
          return this.actions$.pipe(
            ofType(TabelActions.SET_SMENS),
            take(1)
          );
        } else {
          return of(smens);
        }
      })
    );
  }
}
