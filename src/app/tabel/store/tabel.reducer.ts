import * as TabelActions from './tabel.actions';
import {Smena} from '../smen-list/smena.model';
import {WorkerData} from '../../workers/worker-list/worker-data.model';


export interface State {
  smens: Smena[];
  editedSmena: Smena;
  workers: WorkerData[];
  editedWorkerData: WorkerData;
  editedWorkerDataIndex: number;
  selectedSmenaId: number;
  machineList: string[];
}

const initialState: State = {
  smens: [],
  editedSmena: null,
  workers: [],
  editedWorkerData: null,
  editedWorkerDataIndex: -1,
  selectedSmenaId: null,
  machineList: ['Media-100', 'GIETZ-1', 'GIETZ-2', 'WPS-1100', 'ExpertFold-1', 'ExpertFold-2', 'Media-68', 'Elite']
};

export function tabelReducer(
  state: State = initialState,
  actions: TabelActions.TabelActions
) {
  switch (actions.type) {
    case TabelActions.ADD_SMENA:
      return {
        ...state,
        smens: [...state.smens, actions.payload]
      };
    case TabelActions.ADD_SMENS:
      return {
        ...state,
        smens: [...state.smens, ...actions.payload]
      };
    case TabelActions.SET_SMENS:
      return {
        ...state,
        smens: [...actions.payload]
      };
    case TabelActions.UPDATE_SMENA:
      const updatedSmena = {
        ...state.smens[actions.payload.index],
        ...actions.payload.newSmena
      };

      const updatedSmens = [...state.smens];
      updatedSmens[actions.payload.index] = updatedSmena;

      return {
        ...state,
        smens: updatedSmens
      };
    case TabelActions.SELECT_SMENA:
      return {
        ...state,
        selectedSmenaId: actions.payload
      };
    case TabelActions.UNSELECT_SMENA:
      return {
        ...state,
        selectedSmenaId: null
      };
    case TabelActions.DELETE_SMENA:
      const allSmens = state.smens;
      state.smens.splice(actions.payload, 1);
      return {
        ...state,
        smens: allSmens
      };
    default:
      return state;
  }
}
