import {WorkerData} from '../worker-list/worker-data.model';
import * as WorkersActions from './workers.actions';
import * as TabelActions from '../../tabel/store/tabel.actions';

export interface State {
  workers: WorkerData[];
  editedWorkerData: WorkerData;
  editedWorkerDataIndex: number;
}

const initialState: State = {
  workers: [],
  editedWorkerData: null,
  editedWorkerDataIndex: -1
};

export function workersReducer(
  state: State = initialState,
  action: WorkersActions.WorkersActions
) {
  switch (action.type) {
    case WorkersActions.ADD_WORKERDATA:
      return {
        ...state,
        workers: [...state.workers, action.payload]
      };
    case WorkersActions.UPDATE_WORKERDATA:
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
    case WorkersActions.DELETE_WORKERDATA:
      return {
        ...state,
        workers: state.workers.filter((wrk, wrkIndex) => {
          return wrkIndex !== state.editedWorkerDataIndex;
        }),
        editedWorkerDataIndex: -1,
        editedWorkerData: null
      };
    case WorkersActions.START_EDIT_WORKERDATA:
      return {
        ...state,
        editedWorkerDataIndex: action.payload,
        editedWorkerData: { ...state.workers[action.payload] }
      };
    case WorkersActions.STOP_EDIT_WORKERDATA:
      return {
        ...state,
        editedWorkerDataIndex: -1,
        editedWorkerData: null,
      };
    case WorkersActions.SET_WORKERS:
      return {
        ...state,
        workers: action.payload
      };
    default:
      return state;
  }
}
