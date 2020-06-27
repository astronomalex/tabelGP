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
  }

  onDeleteWorkUnit(i: number) {
    this.deleteWorkUnit.emit(i);
  }

  calculateReportTime(typeWork: string = null) {
    let minutesOfReport = 0;
    console.log('workUnits: ' + this.workUnits);
    if (typeWork && this.workUnits) {
      console.log('workUnits' + this.workUnits);
      for (const workUnit of this.workUnits) {
        if (typeWork === workUnit.typeWork) {
          minutesOfReport += workUnit.getworkTime();
        }
      }
    } else {
      for (const workUnit of this.workUnits) {
        minutesOfReport += workUnit.getworkTime();
      }
    }
    // console.log(this.reportService.calculateTime(this.dateSmen, control.controls.startTime.value, control.controls.endTime.value));
    console.log('minutesOfReport: ' + minutesOfReport);
    return minutesOfReport;
  }

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
