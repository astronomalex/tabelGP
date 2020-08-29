import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Norma} from '../report/norma.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as NormsActions from './store/norms.action';
import {Actions, ofType} from '@ngrx/effects';
import {map, switchMap, take} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class NormsResolverService implements Resolve<{ [machine: string]: Norma[] }> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('norms').pipe(
      take(1),
      map(normsState => {
        return normsState.allNorms;
      }),
      switchMap( norms => {
        if (!norms) {
          this.store.dispatch(new NormsActions.FetchNorms());
          return this.actions$.pipe(
            ofType(NormsActions.SET_NORMS),
            take(1)
          );
        } else {
          return of(norms);
        }
      })
    );
  }
}
