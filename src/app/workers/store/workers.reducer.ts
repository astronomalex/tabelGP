import {WorkerData} from '../worker-list/worker-data.model';
import * as WorkersActions from './workers.actions';

export interface State {
  workers: WorkerData[];
}

const initialState: State = {
  workers: []
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
      // const workerData = state.workers[state.editedWorkerDataIndex];
      const updatedWorkerData = {
        ...state.workers[action.payload.index],
        ...action.payload.newWorkerData
      };
      const updatedWorkers = [...state.workers];
      updatedWorkers[action.payload.index] = updatedWorkerData;
      return {
        ...state,
        workers: updatedWorkers
      };
    case WorkersActions.DELETE_WORKERDATA:
      return {
        ...state,
        workers: state.workers.filter((wrk, wrkIndex) => {
          return wrkIndex !== action.payload;
        })
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
