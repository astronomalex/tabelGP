import {Action} from '@ngrx/store';
import { WorkerTime } from 'src/app/workers/worker-list/workers-time.model';
import { Smena } from '../smen-list/smena.model';
import {WorkerData} from '../../workers/worker-list/worker-data.model';
import {Actions} from '@ngrx/effects';


export const ADD_SMENA = '[Tabel] Add Smena';
export const ADD_SMENS = '[Tabel] Add Smens';
export const SET_SMENS = '[Tabel] Set Smens';
export const UPDATE_SMENA = '[Tabel] Update Smena';
export const DELETE_SMENA = '[Tabel] Delete Smena';
export const FETCH_SMENS = '[Tabel] Fetch Smens';
export const STORE_SMENS = '[Tabel] Store Smens';


export class AddSmena implements Action {
  readonly type = ADD_SMENA;

  constructor(public payload: Smena) {}
}

export class AddSmens implements Action {
  readonly type = ADD_SMENS;

  constructor(public payload: Smena[]) {}
}

export class SetSmens implements Action {
  readonly type = SET_SMENS;

  constructor(public payload: Smena[]) {}
}

export class UpdateSmena implements Action {
  readonly type = UPDATE_SMENA;

  constructor(public payload: {index: number, newSmena: Smena}) {}
}

export class DeleteSmena implements Action {
  readonly type = DELETE_SMENA;

  constructor(public payload: number) {}
}

export class FetchSmens implements Action {
  readonly type = FETCH_SMENS;
}

export class StoreSmens implements Action {
  readonly  type = STORE_SMENS;
}

export type TabelActions =
  | AddSmena
  | AddSmens
  | SetSmens
  | UpdateSmena;
