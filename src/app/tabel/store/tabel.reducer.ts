import * as TabelActions from './tabel.actions';
import { Smena } from '../smen-list/smena.model';
import { WorkerTime } from 'src/app/workers/worker-list/workers-time.model';
import {WorkerData} from '../../workers/worker-list/worker-data.model';


export interface State {
  smens: Smena[];
  workers: WorkerData[];
  editedWorkerData: WorkerData;
  editedWorkerDataIndex: number;
}

export interface AppState {
  tabel: State;
}

const initialState: State = {
  smens: [
    new Smena(new Date(2020, 2, 3).toLocaleDateString(), 'WPS', '1', [
      new WorkerTime('8609', '5', 11.5, 0, 0, 0, 0),
      new WorkerTime('3527', '2', 8, 0, 0, 0, 0)
    ]),
    new Smena(new Date(2020, 0, 23).toLocaleDateString(), 'HTF-1', '1', [
      new WorkerTime('8609', '5', 11.5, 0, 0, 0, 0),
      new WorkerTime('3527', '2', 5.5, 0, 0, 0, 0)
    ])
  ],
  workers: [],
  editedWorkerData: null,
  editedWorkerDataIndex: -1
};

export function tabelReducer(
  state: State = initialState,
  action: TabelActions.TabelActions
) {
  switch (action.type) {
    case TabelActions.ADD_SMENA:
      return {
        ...state,
        smens: [...state.smens, action.payload]
      };
    case TabelActions.ADD_SMENS:
      return {
        ...state,
        smens: action.payload
      };
    case TabelActions.ADD_WORKERDATA:
      return {
        ...state,
        workers: [...state.workers, action.payload]
      };
    case TabelActions.UPDATE_WORKERDATA:
      const workerData = state.workers[state.editedWorkerDataIndex];
      const  updatedWorkerData = {
        ...workerData,
        ...action.payload
      };
      const updatedWorkers = [...state.workers];
      updatedWorkers[state.editedWorkerDataIndex] = updatedWorkerData;
      return {
        ...state,
        workers: updatedWorkers,
        editedWorkerDataIndex: -1,
        editedWorkerData: null
      };
    case TabelActions.DELETE_WORKERDATA:
      return {
        ...state,
        workers: state.workers.filter((wrk, wrkIndex) => {
          return wrkIndex !== state.editedWorkerDataIndex;
        }),
        editedWorkerDataIndex: -1,
        editedWorkerData: null
      };
    case TabelActions.START_EDIT_WORKERDATA:
      return {
        ...state,
        editedWorkerDataIndex: action.payload,
        editedWorkerData: { ...state.workers[action.payload] }
      };
    case TabelActions.STOP_EDIT_WORKERDATA:
      return {
        ...state,
        editedWorkerDataIndex: -1,
        editedWorkerData: null,
      };
    case TabelActions.SET_WORKERS:
      return {
        ...state,
        workers: action.payload
      };
    default:
      return state;
  }
}
