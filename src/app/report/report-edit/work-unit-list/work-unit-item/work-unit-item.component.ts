import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkUnit} from '../../../work-unit.model';
import {ReportService} from '../../../report.service';
import {FormArray, FormGroup} from '@angular/forms';
import {Norma} from '../../../norma.model';

@Component({
  selector: 'app-work-unit-item',
  templateUrl: './work-unit-item.component.html',
  styleUrls: ['./work-unit-item.component.css']
})
export class WorkUnitItemComponent implements OnInit {
  @Input() dateSmen: string;
  @Input() norms: Norma[];
  @Input() reportForm: FormGroup;
  @Input() workUnits: WorkUnit[];
  @Input() typesOfWorks: string[];
  selectedTypeOfWorks: string;
  @Output() formChanged = new EventEmitter<{ typeWork: string, amountMinutes: number }>();
  @Output() deleteWorkUnit = new EventEmitter<number>();
  startWorkTime: number;
  endWorkTime: number;
  amountOfMinutes: number;

  // workStartTime: time;

  constructor(
    private reportService: ReportService
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
    this.formChanged.emit({typeWork: this.selectedTypeOfWorks, amountMinutes: this.amountOfMinutes});
  }

  getWorkUnits() {
    return (this.reportForm.get('workUnitList') as FormArray).controls;
  }

  onDeleteWorkUnit(index: number) {
    // (this.reportForm.get('workUnitList') as FormArray).removeAt(index);

  }



}
