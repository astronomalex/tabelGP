import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkUnit} from '../../../work-unit.model';
import {ReportService} from '../../../report.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Norma} from '../../../norma.model';
import {select, Store} from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import {getEditedReport, getEditedWorkUnits} from '../../../../store/selectors/app.selector';

@Component({
  selector: 'app-work-unit-item',
  templateUrl: './work-unit-item.component.html',
  styleUrls: ['./work-unit-item.component.css']
})
export class WorkUnitItemComponent implements OnInit {
  @Input() dateSmen: string;
  @Input() norms: Norma[];
  @Input() reportForm: FormGroup;
  @Input() workUnit: WorkUnit;
  @Input() typesOfWorks: string[];
  @Input() index: number;
  selectedTypeOfWorks: string;
  @Output() formChanged = new EventEmitter<{ typeWork: string, amountMinutes: number }>();
  @Output() deleteWorkUnit = new EventEmitter<number>();
  startWorkTime: number;
  endWorkTime: number;
  amountOfMinutes: number;
  workUnits$ = this.store.pipe(select(getEditedWorkUnits));

  // workStartTime: time;

  constructor(
    private reportService: ReportService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    if (this..workListReport) {
      for (const work of report.workListReport) {
        workUnitList.push(
          new FormGroup({
            startTime: new FormControl(work.startWorkTime, [Validators.required]),
            endTime: new FormControl(work.endWorkTime, [Validators.required]),
            typeWork: new FormControl(work.typeWork, [Validators.required]),
            numOrder: new FormControl(work.numOrder, [Validators.required]),
            nameOrder: new FormControl(work.nameOrder, [Validators.required]),
            groupDifficulty: new FormControl(work.groupDifficulty, [Validators.required])
          })
        );
      }
      this.selectedWorker = null;
    }
  }

  calculateTimeInMinutes() {
    // const workTime = (this.endWorkTime.getTime() - this.startWorkTime.getTime()) * 3600000;
    // return workTime;
  }



  onWorkTimeChanged(numberOfMinutes) {
    console.log('numberOfMinutes had changed: ' + numberOfMinutes);
    this.amountOfMinutes = numberOfMinutes;
    this.formChanged.emit({typeWork: this.selectedTypeOfWorks, amountMinutes: this.amountOfMinutes});
  }

  getWorkUnits() {
    return (this.reportForm.get('workUnitList') as FormArray).controls;
  }

  onDeleteWorkUnit(index: number) {
    // (this.reportForm.get('workUnitList') as FormArray).removeAt(index);
    this.deleteWorkUnit.emit(index);
  }



}
