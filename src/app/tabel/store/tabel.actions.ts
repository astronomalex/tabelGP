import {Action} from '@ngrx/store';
import { WorkerTime } from 'src/app/workers/worker-list/workers-time.model';
import { Smena } from '../smen-list/smena.model';

export const ADD_WORKERTIME = 'ADD_WORKERTIME';
export const DELETE_WORKERTIME = 'DELETE_WORKER';
export const ADD_SMENA = 'ADD_SMENA';
export const ADD_SMENS = 'ADD_SMENS';

export class AddWorkerTime implements Action {
  readonly type = ADD_WORKERTIME;

  constructor(public payload: WorkerTime) {}
}

export class DeleteWorkerTime implements Action {
  readonly type = DELETE_WORKERTIME;

  constructor(public payload: {index: number}) {}
}

export class AddSmena implements Action {
  readonly type = ADD_SMENA;

  constructor(public payload: Smena) {}
}

export class AddSmens implements Action {
  readonly type = ADD_SMENS;

  constructor(public payload: Smena[]) {}
}

export type TabelActions =
  | AddWorkerTime
  | DeleteWorkerTime
  | AddSmena
  | AddSmens;
