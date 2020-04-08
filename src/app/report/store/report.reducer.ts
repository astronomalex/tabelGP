import {Report} from '../report.model';
import * as RaportActions from './report.actions';

export interface State {
  raports: Report[];
}

const initialState: State = {
  raports: []
};

export function reportReducer(
  state: State = initialState,
  actions: RaportActions.ReportActions
) {
  switch (actions.type) {
    case RaportActions.ADD_REPORT:
      return {
        ...state,
        raports: [...state.raports, actions.payload]
      };
    case RaportActions.SET_REPORTS:
      return {
        ...state,
        raports: actions.payload
      };
  }
}
