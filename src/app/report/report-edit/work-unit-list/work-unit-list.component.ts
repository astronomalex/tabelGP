import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReportService} from '../../report.service';
import {Norma} from '../../norma.model';
import {WorkUnit} from '../../work-unit.model';
import * as fromApp from '../../../store/app.reducer';
import {select, Store} from '@ngrx/store';
import {getEditedReport, getEditedWorkUnits} from '../../../store/selectors/app.selector';


@Component({
  selector: 'app-work-unit-list',
  templateUrl: './work-unit-list.component.html',
  styleUrls: ['./work-unit-list.component.css']
})
export class WorkUnitListComponent implements OnInit {
  @Input() dateSmen: string;
  @Input() norms: Norma[];
  @Input() typesOfWorks: string[];
  @Input() reportForm: FormGroup;
  controlWorks: FormArray;
  workUnitForm: FormGroup;
  @Input() workUnits: WorkUnit[];
  @Output() deleteWorkUnit = new EventEmitter<number>();
  @Output() addWorkUnit = new EventEmitter();

  editedReport$ = this.store.pipe(select(getEditedReport));
  workUnits$ = this.store.pipe(select(getEditedWorkUnits));

  constructor(
    private reportService: ReportService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.controlWorks = this.reportForm.get('workUnitList') as FormArray;
  }

  getControlsWorks() {
    console.log('from getControlWorks reportForm: ' + this.reportForm);
    if (this.reportForm) {
      return (this.reportForm.get('workUnitList') as FormArray).controls;
    } else {
      return undefined;
    }
  }

  onDeleteWorkUnit(i: number) {
    this.deleteWorkUnit.emit(i);
  }

  calculateReportTime(typeWork: string = null) {
    let minutesOfReport = 0;
    console.log('workUnits: ' + this.workUnits);
    console.log('typework: ' + typeWork);
    if (this.workUnits !== undefined) {
      console.log('workUnits' + this.workUnits);
      for (const workUnit of this.workUnits) {
        if (typeWork === workUnit.typeWork) {
          minutesOfReport += workUnit.getworkTime();
        }
      }
    } else if (this.controlWorks) {
      // for (const workUnitControl of this.controlWorks.controls) {
      //   minutesOfReport +=
      //     this.reportService.calculateTime(
      //       this.dateSmen, workUnitControl.startTime.value, workUnitControl.endTime.value
      //     );
      //   console.log(
      //     this.reportService.calculateTime(this.dateSmen, workUnitControl.startTime.value, workUnitControl.endTime.value)
      //   );
      // }
    }
    console.log('minutesOfReport: ' + minutesOfReport);
    return minutesOfReport;
  }

  // getControlsWorks() {
  //   return this.controlWorks;
  // }

  onAddWorkUnit() {
    this.addWorkUnit.emit();
    // (this.reportForm.get('workUnitList') as FormArray).push(
    //   new FormGroup({
    //     startTime: new FormControl(null, [Validators.required]),
    //     endTime: new FormControl(null, [Validators.required]),
    //     typeWork: new FormControl(null, [Validators.required]),
    //     numOrder: new FormControl(null, [Validators.required]),
    //     nameOrder: new FormControl(null, [Validators.required]),
    //     groupDifficulty: new FormControl(null, [Validators.required])
    //   })
    // );
  }
}
