import {Action} from '@ngrx/store';
import { WorkerTime } from 'src/app/workers/worker-list/workers-time.model';
import { Smena } from '../smen-list/smena.model';
import {WorkerData} from '../../workers/worker-list/worker-data.model';

export const SET_WORKERS = 'SET_WORKERS';
export const ADD_WORKERDATA = 'ADD_WORKERDATA';
export const DELETE_WORKERDATA = 'DELETE_WORKERDATA';
export const ADD_SMENA = 'ADD_SMENA';
export const ADD_SMENS = 'ADD_SMENS';

export class AddWorkerData implements Action {
  readonly type = ADD_WORKERDATA;

  constructor(public payload: WorkerData) {}
}

export class DeleteWorkerData implements Action {
  readonly type = DELETE_WORKERDATA;

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

export class SetWorkers implements Action {
  readonly type = SET_WORKERS;

  constructor(public payload: WorkerData[]) {}
}

export type TabelActions =
  | AddWorkerData
  | DeleteWorkerData
  | AddSmena
  | AddSmens
  | SetWorkers;
