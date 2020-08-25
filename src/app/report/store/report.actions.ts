import {Report} from '../report.model';
import {Action} from '@ngrx/store';

export const ADD_REPORT = '[Reports] Add Report';
export const UPDATE_REPORT = '[Reports] Update Report';
export const SELECT_REPORT = '[Reports] Select Report';
export const DELETE_REPORT = '[Reports] Delete Report';
export const SET_REPORTS = '[Reports] Set Reports';
export const SELECT_MACHINE = '[Reports] Select Machine';
export const EDITED_REPORT_UPDATE = '[Reports] Edited Report Update';
export const FETCH_REPORTS = '[Reports] Fetch Reports';
export const STORE_REPORTS = '[Reports] Store Reports';

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

export class SelectReport implements Action {
  readonly type = SELECT_REPORT;

  constructor(public payload: number) {}
}

export class DeleteReport implements Action {
  readonly  type = DELETE_REPORT;

  constructor(public payload: number) {}
}

export class SelectMachine implements Action {
  readonly type = SELECT_MACHINE;

  constructor(public payload: string) {
  }
}

export class EditedReportUpdate implements Action {
  readonly type = EDITED_REPORT_UPDATE;

  constructor(public payload: Report) {
  }
}

export class FetchReports implements Action {
  readonly type = FETCH_REPORTS;
}

export class StoreReport implements Action {
  readonly type = STORE_REPORTS;
}

export type ReportActions =
  | AddReport
  | UpdateReport
  | SelectReport
  | DeleteReport
  | SetReports
  | SelectMachine
  | EditedReportUpdate;

