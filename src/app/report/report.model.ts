import {WorkUnit} from './work-unit.model';

export class Report {
  dateReport: string;
  machine: string;
  workerListReport: {tbNum: string, grade: string}[];
  numSmenReport: string;
  workListReport: WorkUnit[];
  percentOfReport: number;

  constructor(dateReport?, machine?, workerListTabelNums?, numSmenReport?, workListReport?) {
    if (!workListReport) {
      workListReport = [];
    }
  }

}
