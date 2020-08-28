import * as fromAuth from '../auth/store/auth.reducer';
import * as fromTabel from '../tabel/store/tabel.reducer';
import * as fromWorkers from '../workers/store/workers.reducer';
import * as fromReports from '../report/store/report.reducer';
import * as fromNorms from '../norms/store/norms.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  tabel: fromTabel.State;
  auth: fromAuth.State;
  workers: fromWorkers.State;
  reports: fromReports.State;
  norms: fromNorms.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  tabel: fromTabel.tabelReducer,
  auth: fromAuth.authReducer,
  workers: fromWorkers.workersReducer,
  norms: fromNorms.normsReducer,
  reports: fromReports.reportReducer
};
