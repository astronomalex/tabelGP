import {Action} from '@ngrx/store';
import {WorkerData} from '../worker-list/worker-data.model';

export const SET_WORKERS = '[Workers] Set Workers';
export const ADD_WORKERDATA = '[Workers] Add WorkerData';
export const UPDATE_WORKERDATA = '[Workers] Update WorkerData';
export const DELETE_WORKERDATA = '[Workers] Delete WorkerData';
export const START_EDIT_WORKERDATA = '[Workers] Start Edit WorkerData';
export const STOP_EDIT_WORKERDATA = '[Workers] Stop Edit WorkerData';
export const FETCH_WORKERS = '[Workers] Fetch Workers';
export const STORE_WORKERS = '[Workers] Store Workers';

export class AddWorkerData implements Action {
  readonly type = ADD_WORKERDATA;

  constructor(public payload: WorkerData) {}
}

export class UpdateWorkerData implements Action {
  readonly type = UPDATE_WORKERDATA;

  constructor(public payload: {index: number, newWorkerData: WorkerData}) {}
}
export class SetWorkers implements Action {
  readonly type = SET_WORKERS;

  constructor(public payload: WorkerData[]) {}
}

export class DeleteWorkerData implements Action {
  readonly type = DELETE_WORKERDATA;

  constructor(public payload: number) {}
}

export class StartEditWorkerData implements Action {
  readonly type = START_EDIT_WORKERDATA;

  constructor(public payload: number) {}
}

export class StopEditWorkerData implements Action {
  readonly type = STOP_EDIT_WORKERDATA;
}

export class FetchWorkers implements Action {
  readonly type = FETCH_WORKERS;
}

export class StoreWorkers implements Action {
  readonly type = STORE_WORKERS;
}


export type WorkersActions =
  | SetWorkers
  | AddWorkerData
  | UpdateWorkerData
  | DeleteWorkerData
  | StartEditWorkerData
  | StopEditWorkerData
  | FetchWorkers
  | StoreWorkers;
