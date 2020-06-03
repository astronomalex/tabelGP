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
  @Input() typesOfWorks: string[];
  @Output() formChanged = new EventEmitter<{ typeWork: string, amountMinutes: number }>();

  workItem: WorkUnit;

  constructor(
    private reportService: ReportService
  ) {}

  ngOnInit() {
  }

  calculateTimeInMinutes() {
    // const workTime = (this.endWorkTime.getTime() - this.startWorkTime.getTime()) * 3600000;
  }

  onWorkTimeChanged(numberOfMinutes) {
    console.log('numberOfMinutes had changed: ' + numberOfMinutes);
  }

  getControlsWorkUnits() {
    return (this.reportForm.get('workUnitList') as FormArray).controls;
  }

  onDeleteWorkUnit(index: number) {
    (this.reportForm.get('workUnitList') as FormArray).removeAt(index);
  }

  onDeleteWorker(index: number) {
    (this.reportForm.get('workerFormList') as FormArray).removeAt(index);
  }

}
