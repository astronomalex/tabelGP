import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import * as fromApp from '../../store/app.reducer';
import * as ReportActions from '../store/report.actions';
import {Store} from '@ngrx/store';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Report} from '../report.model';
import {Injectable} from '@angular/core';

@Injectable()
export class ReportEffects {
  @Effect()
  fetchReports = this.actions$.pipe(
    ofType(ReportActions.FETCH_REPORTS),
    withLatestFrom(this.store.select('auth')),
    switchMap(([actionData, authState]) => {
        const url: string = 'https://ng-tabelgp.firebaseio.com/' + authState.locId + '_reports.json';
        return this.httpClient.get<Report[]>(url).pipe(
          map(reports => {
            if (reports) {
              return reports.map(report => {
                return {
                  ...report,
                  workerListReport: report.workerListReport ? report.workerListReport : [],
                  workListReport: report.workListReport ? report.workListReport : []
                };
              });
            }
          }),
          map(reports => {
            console.log(reports);
            return new ReportActions.SetReports(reports);
          })
        );
      }
    )
  );

  @Effect({dispatch: false})
  storeReports = this.actions$.pipe(
    ofType(ReportActions.STORE_REPORTS),
    withLatestFrom(this.store.select('reports')),
    withLatestFrom(this.store.select('auth')),
    switchMap(([[actionData, reportState], authState]) => {
      const url = 'https://ng-tabelgp.firebaseio.com/' + authState.locId + '_reports.json';
      return this.httpClient.put(url, reportState.reports);
    })
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
