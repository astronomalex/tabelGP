import {FormArray, FormControl} from '@angular/forms';
import {Report} from '../report.model';

export class ReportEditFormModel {
  dateReport = new FormControl();
  machine = new FormControl();
  workerListTabelNums = new FormControl();
  numSmenReport = new FormControl();
  workListReport = new FormArray([]);

  constructor(report: Report) {
    this.dateReport.setValue(report.dateReport);
    this.machine.setValue(report.machine);
    this.workerListTabelNums.setValue(report.workerListTabelNums);
    this.numSmenReport.setValue(report.numSmenReport);
    this.workListReport.setValue(report.workListReport);
  }
}
