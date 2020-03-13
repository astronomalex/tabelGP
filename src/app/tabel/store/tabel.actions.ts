import {Action} from '@ngrx/store';
import { WorkerTime } from 'src/app/workers/worker-list/workers-time.model';
import { Smena } from '../smen-list/smena.model';
import {WorkerData} from '../../workers/worker-list/worker-data.model';


export const ADD_SMENA = 'ADD_SMENA';
export const ADD_SMENS = 'ADD_SMENS';


export class AddSmena implements Action {
  readonly type = ADD_SMENA;

  constructor(public payload: Smena) {}
}

export class AddSmens implements Action {
  readonly type = ADD_SMENS;

  constructor(public payload: Smena[]) {}
}

export type TabelActions =
  | AddSmena
  | AddSmens;
