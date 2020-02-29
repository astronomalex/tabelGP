import * as TabelActions from './tabel.actions';
import { Smena } from '../smen-list/smena.model';


export interface State {
  smens: Smena[];
  editedSmen: Smena;
  editedSmenIndex: number;
}

export interface AppState {
  tabel: State;
}

const initialState: State = {
  smens: [],
  editedSmen: null,
  editedSmenIndex: -1
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
  }
}
