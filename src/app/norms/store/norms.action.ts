import {Norma} from '../../report/norma.model';
import {Action} from '@ngrx/store';

export const ADD_NORM = '[Norms] Add Norm';
export const SET_NORMS = '[Norms] Set Norms';
export const UPDATE_NORM = '[Norms] Update Norm';
export const DELETE_NORM = '[Norms] Delete Norm';
export const FETCH_NORMS = '[Norms] Fetch Norms';
export const STORE_NORMS = '[Norms] Store Norms';
export const SELECT_NORM = '[Norms] Select Norm';

export class AddNorm implements Action {
  readonly type = ADD_NORM;

  constructor(public payload: {machine: string, norma: Norma}) {
  }
}

export class SetNorms implements Action {
  readonly type = SET_NORMS;

  constructor(public payload: { [machine: string]: Norma[] }) {
  }
}

export class UpdateNorm implements Action {
  readonly type = UPDATE_NORM;

  constructor(public payload: { machine: string, norm: Norma }) {
  }
}

export class DeleteNorm implements Action {
  readonly type = DELETE_NORM;

  constructor(public payload: { groupDiff: string, machine: string }) {
  }
}

export class FetchNorms implements Action {
  readonly type = FETCH_NORMS;
}

export class StoreNorms implements Action {
  readonly type = STORE_NORMS;
}

export class SelectNorm implements Action {
  readonly type = SELECT_NORM;

  constructor(public payload: {machine: string, groupDiff: string}) {
  }
}

export type NormsAction =
  | AddNorm
  | SetNorms
  | UpdateNorm
  | DeleteNorm
  | FetchNorms
  | StoreNorms
  | SelectNorm;
