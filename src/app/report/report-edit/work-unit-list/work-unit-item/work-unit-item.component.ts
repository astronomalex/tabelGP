import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkUnit} from '../../../work-unit.model';
import {ReportService} from '../../../report.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Norma} from '../../../norma.model';
import {select, Store} from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import {getEditedReport, getEditedWorkUnits} from '../../../../store/selectors/app.selector';
import {TimeWorkInfo} from '../../time-work-Info.model';

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
  @Output() formChanged = new EventEmitter<TimeWorkInfo>();
  @Output() deleteWorkUnit = new EventEmitter<number>();
  @Input() workUnitForm: FormGroup;
  // startWorkTime: number;
  // endWorkTime: number;
  amountOfMinutes: number;
  workUnits$ = this.store.pipe(select(getEditedWorkUnits));

  // workStartTime: time;

  constructor(
    private reportService: ReportService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {

  }

  calculateTimeInMinutes() {
    // const workTime = (this.endWorkTime.getTime() - this.startWorkTime.getTime()) * 3600000;
    // return workTime;
  }



  onWorkTimeChanged(numberOfMinutes) {
    console.log('numberOfMinutes had changed: ' + numberOfMinutes);
    this.amountOfMinutes = numberOfMinutes;
    const timeWorkInfo = new TimeWorkInfo(
      this.index,
      this.workUnitForm.get('typeWork').value,
      this.amountOfMinutes
    );
    this.formChanged.emit(timeWorkInfo);
  }

  // getWorkUnits() {
  //   return (this.reportForm.get('workUnitList') as FormArray).controls;
  // }

  onDeleteWorkUnit() {
    // (this.reportForm.get('workUnitList') as FormArray).removeAt(index);
    this.deleteWorkUnit.emit(this.index);
  }



}
