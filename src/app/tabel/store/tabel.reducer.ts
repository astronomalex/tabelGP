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
        smens: [...state.smens, ...action.payload]
      };
    case TabelActions.SET_SMENS:
      return {
        ...state,
        smens: [...action.payload]
      };
    case TabelActions.UPDATE_SMENA:
      const updatedSmena = {
        ...state.smens[action.payload.index],
        ...action.payload.newSmena
      };

      const updatedSmens = [...state.smens];
      updatedSmens[action.payload.index] = updatedSmena;

      return {
        ...state,
        smens: updatedSmens
      };
    default:
      return state;
  }
}
