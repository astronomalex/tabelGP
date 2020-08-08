import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ReportEditForm} from './report-edit-form.model';
import {Report} from '../report.model';
import {WorkUnit} from '../work-unit.model';
import {WorkUnitFormModel} from './work-unit-form.model';

@Injectable({
  providedIn: 'root'
})
export class ReportEditFormService {
  private reportForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(this.fb.group(new ReportEditForm(new Report())));
  reportForm$: Observable<FormGroup> = this.reportForm.asObservable();

  constructor(private fb: FormBuilder) {
  }

  addWork() {
    const currentReport = this.reportForm.getValue();
    const currentWork = currentReport.get('workListReport') as FormArray;

    currentWork.push(
      this.fb.group(
        new WorkUnitFormModel(
          new WorkUnit()
        )
      )
    );
    this.reportForm.next(currentReport);
  }

  delWork(i: number) {
    const currentReport = this.reportForm.getValue();
    const currentWorks = currentReport.get('workListReport') as FormArray;

    currentWorks.removeAt(i);
  }
}
