import {Report} from '../report.model';
import * as ReportActions from './report.actions';
import {Norma} from '../norma.model';

export interface State {
  reports: Report[];
  typesOfWork: string[];
  norms: Norma[];
}

const initialState: State = {
  reports: [],
  typesOfWork: ['Работа', 'Настройка', 'Простой', 'По среднему', 'ППР'],
  norms: [{grpDiff: '11', norma: 202.85}, {grpDiff: '15', norma: 263.85}]
};

export function reportReducer(
  state: State = initialState,
  actions: ReportActions.ReportActions
) {
  switch (actions.type) {

    case ReportActions.ADD_REPORT:
      return {
        ...state,
        reports: [...state.reports, actions.payload]
      };

    case ReportActions.UPDATE_REPORT:
      const updatedReport = {
        ...state.reports[actions.payload.index],
        ...actions.payload.newReport
      };

      const updatedReports = [...state.reports];
      updatedReports[actions.payload.index] = updatedReport;
      return {
        ...state,
        reports: updatedReports
      };

    case ReportActions.SET_REPORTS:
      return {
        ...state,
        reports: actions.payload
      };

    default:
      return state;
  }
}
