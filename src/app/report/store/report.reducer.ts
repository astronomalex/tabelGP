import {Report} from '../report.model';
import * as ReportActions from './report.actions';
import {Norma} from '../norma.model';

export interface State {
  reports: Report[];
  typesOfWork: string[];
  selectedMachine: string;
  selectedReportId: number;
  allNorms: { [machine: string]: Norma[] };
  editedReport: Report;
}

const initialState: State = {
  // reports: [
  //   // {dateReport: '23.08.2020', machine: 'Media-100', numSmenReport: '2', workerListReport: [], workListReport: [], percentOfReport: 0}
  // ],
  reports: [],
  typesOfWork: ['Работа', 'Настройка', 'Простой', 'По среднему', 'ППР'],
  selectedMachine: null,
  selectedReportId: null,
  allNorms: {
    'GIETZ-1': [{grpDiff: '5', norma: 144000}, {grpDiff: '4', norma: 160000}],
    'Media-100': [{grpDiff: '11', norma: 202850}, {grpDiff: '15', norma: 263850}]
  },
  editedReport: null
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

    case ReportActions.SELECT_REPORT:
      return {
        ...state,
        selectedReportId: actions.payload
      };

    case ReportActions.DELETE_REPORT:
      return {
        ...state,
        reports: state.reports.filter((report, index) => {
          return index !== actions.payload;
        })
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

    case ReportActions.EDITED_REPORT_UPDATE:
      const editedUpdatedReport = {
        ...state.editedReport,
        ...actions.payload
      };
      return {
        ...state,
        ...editedUpdatedReport
      };

    default:
      return state;
  }
}
