import {Report} from '../report.model';
import * as ReportActions from './report.actions';
import {Norma} from '../norma.model';

export interface State {
  reports: Report[];
  typesOfWork: string[];
  selectedMachine: string;
  allNorms: {[machine: string]: Norma[]}[];
}

const initialState: State = {
  reports: [],
  typesOfWork: ['Работа', 'Настройка', 'Простой', 'По среднему', 'ППР'],
  selectedMachine: null,
  allNorms: [
    {'GIETZ-1': [{grpDiff: '5', norma: 144000}, {grpDiff: '4', norma: 160000}]},
    {'Media-100': [{grpDiff: '11', norma: 202850}, {grpDiff: '15', norma: 263850}]}
    ]
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

    case ReportActions.SELECT_MACHINE:
      return {
        ...state,
        selectedMachine: actions.payload
      };

    default:
      return state;
  }
}
