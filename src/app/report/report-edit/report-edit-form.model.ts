import {FormArray, FormControl} from '@angular/forms';
import {Report} from '../report.model';

export class ReportEditForm {
  dateReport = new FormControl();
  machine = new FormControl();
  // workerListReport = new FormControl();
  numSmenReport = new FormControl();
  workListReport = new FormArray([]);
  public workerListReport = new FormArray([]);

  constructor(report: Report) {
    this.dateReport.setValue(report.dateReport);
    this.machine.setValue(report.machine);
    this.workerListReport.setValue(report.workerListReport);
    this.numSmenReport.setValue(report.numSmenReport);
    if (report.workListReport) {
      this.workListReport.setValue(report.workListReport);
    }
  }
}
