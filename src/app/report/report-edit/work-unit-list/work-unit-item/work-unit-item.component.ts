import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkUnit} from '../../../work-unit.model';
import {ReportService} from '../../../report.service';
import {FormArray, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-work-unit-item',
  templateUrl: './work-unit-item.component.html',
  styleUrls: ['./work-unit-item.component.css']
})
export class WorkUnitItemComponent implements OnInit {
  @Input() dateSmen: string;
  @Input() reportForm: FormGroup;
  @Output() formChanged = new EventEmitter<{ typeWork: string, amountMinutes: number }>();
  workItem: WorkUnit;

  constructor(
    private reportService: ReportService
  ) {}

  ngOnInit() {
  }

  calculateTimeInMinutes() {
    let workTime = (this.endWorkTime.getTime() - this.startWorkTime.getTime()) * 3600000;
  }

  onWorkTimeChanged(numberOfMinutes) {
    console.log('numberOfMinutes had changed: ' + numberOfMinutes);
  }

  getControlsWorkUnits() {
    return (this.reportForm.get('workUnitList') as FormArray).controls;
  }
}
