import {Norma} from '../../report/norma.model';
import {Action} from '@ngrx/store';

export const ADD_NORM = '[Norms] Add Norm';
export const SET_NORMS = '[Norms] Set Norms';
export const UPDATE_NORM = '[Norms] Update Norm';
export const DELETE_NORM = '[Norms] Delete Norm';
export const FETCH_NORMS = '[Norms] Fetch Norms';
export const STORE_NORMS = '[Norms] Store Norms';

export class AddNorm implements Action {
  readonly type = ADD_NORM;

  constructor(public payload: Norma) {
  }
}

export type NormsAction =
  | AddNorm;
