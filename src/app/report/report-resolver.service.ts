import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Report} from './report.model';

import * as fromApp from '../store/app.reducer';
import * as ReportActions from './store/report.actions';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {map, switchMap, take} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ReportResolverService implements Resolve<Report[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('reports').pipe(
      take(1),
      map(reportState => {
        return reportState.reports;
      }),
      switchMap(reports => {
        if (reports.length === 0) {
          this.store.dispatch(new ReportActions.FetchReports());
          return this.actions$.pipe(
            ofType(ReportActions.SET_REPORTS),
            take(1)
          );
        } else {
          return of(reports);
        }
      })
    );
  }
}
