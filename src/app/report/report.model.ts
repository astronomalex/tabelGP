import {WorkUnit} from './work-unit.model';

export class Report {
  dateReport: string;
  machine: string;
  workerListTabelNums: string[];
  numSmenReport: string;
  workListReport: WorkUnit[];
}
