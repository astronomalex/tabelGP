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
  @Input() workUnitForm: FormGroup;
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
    // if (this.workUnit) {
    //   this.workUnitForm = new FormGroup({
    //     startTime: new FormControl(this.workUnit.startWorkTime, [Validators.required]),
    //     endTime: new FormControl(this.workUnit.endWorkTime, [Validators.required]),
    //     typeWork: new FormControl(this.workUnit.typeWork, [Validators.required]),
    //     numOrder: new FormControl(this.workUnit.numOrder, [Validators.required]),
    //     nameOrder: new FormControl(this.workUnit.nameOrder, [Validators.required]),
    //     groupDifficulty: new FormControl(this.workUnit.groupDifficulty, [Validators.required])
    //   });
    // }
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

  // getWorkUnits() {
  //   return (this.reportForm.get('workUnitList') as FormArray).controls;
  // }

  onDeleteWorkUnit() {
    // (this.reportForm.get('workUnitList') as FormArray).removeAt(index);
    this.deleteWorkUnit.emit(this.index);
  }



}
