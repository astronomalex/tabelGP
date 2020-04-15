import {Report} from '../report.model';
import {Action} from '@ngrx/store';

export const ADD_REPORT = '[Reports] Add Report';
export const UPDATE_REPORT = '[Reports] Update Report';
export const SET_REPORTS = '[Reports] Set Reports';

export class AddReport implements Action {
  readonly type = ADD_REPORT;

  constructor(public payload: Report) {
  }
}

export class SetReports implements Action {
  readonly type = SET_REPORTS;

  constructor(public payload: Report[]) {
  }
}

export class UpdateReport implements Action {
  readonly type = UPDATE_REPORT;

  constructor(public payload: { index: number, newReport: Report }) {
  }
}

export type ReportActions =
  | AddReport
  | UpdateReport
  | SetReports;
