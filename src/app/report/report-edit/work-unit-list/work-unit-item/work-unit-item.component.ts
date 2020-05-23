import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkUnit} from '../../../work-unit.model';
import {ReportService} from '../../../report.service';

@Component({
  selector: 'app-work-unit-item',
  templateUrl: './work-unit-item.component.html',
  styleUrls: ['./work-unit-item.component.css']
})
export class WorkUnitItemComponent implements OnInit {
  @Input() dateSmen: string;
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

}
