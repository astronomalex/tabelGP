import {Action} from '@ngrx/store';
import { WorkerTime } from 'src/app/workers/worker-list/workers-time.model';
import { Smena } from '../smen-list/smena.model';
import {WorkerData} from '../../workers/worker-list/worker-data.model';

export const SET_WORKERS = 'SET_WORKERS';
export const ADD_WORKERDATA = 'ADD_WORKERDATA';
export const UPDATE_WORKERDATA = 'UPDATE_WORKERDATA';
export const DELETE_WORKERDATA = 'DELETE_WORKERDATA';
export const START_EDIT_WORKERDATA = 'START_EDIT_WORKERDATA';
export const STOP_EDIT_WORKERDATA = 'STOP_EDIT_WORKERDATA';
export const ADD_SMENA = 'ADD_SMENA';
export const ADD_SMENS = 'ADD_SMENS';

export class AddWorkerData implements Action {
  readonly type = ADD_WORKERDATA;

  constructor(public payload: WorkerData) {}
}

export class UpdateWorkerData implements Action {
  readonly type = UPDATE_WORKERDATA;

  constructor(public payload: WorkerData) {}
}

export class DeleteWorkerData implements Action {
  readonly type = DELETE_WORKERDATA;

  constructor(public payload: {index: number}) {}
}

export class StartEditWorkerData implements Action {
  readonly type = START_EDIT_WORKERDATA;

  constructor(public payload: number) {}
}

export class StopEditWorkerData implements Action {
  readonly type = STOP_EDIT_WORKERDATA;
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
  | SetWorkers
  | AddWorkerData
  | UpdateWorkerData
  | DeleteWorkerData
  | StartEditWorkerData
  | StopEditWorkerData
  | AddSmena
  | AddSmens;
