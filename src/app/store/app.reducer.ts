import * as fromAuth from '../auth/store/auth.reducer';
import * as fromTabel from '../tabel/store/tabel.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  tabel: fromTabel.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  tabel: fromTabel.tabelReducer,
  auth: fromAuth.authReducer
};
