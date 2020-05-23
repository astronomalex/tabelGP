import {Component, Input, OnInit} from '@angular/core';
import {FormArray} from '@angular/forms';
import {ReportService} from '../../report.service';

@Component({
  selector: 'app-work-unit-list',
  templateUrl: './work-unit-list.component.html',
  styleUrls: ['./work-unit-list.component.css']
})
export class WorkUnitListComponent implements OnInit {
  @Input() dateSmen: string;
  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
  }

  calculateReportTime(typeWork: string = null) {
    let minutesOfReport = 0;
    if (typeWork) {
      for (const control of (this.reportForm.get('workUnitList') as FormArray).controls) {
        if (typeWork === control.controls.typeWork.value) {
          minutesOfReport +=
            this.reportService.calculateTime(
              this.dateSmen,
              control.controls.startTime.value,
              control.controls.endTime.value
            );
        }
      }
    } else {
      for (const control of (this.reportForm.get('workUnitList') as FormArray).controls) {
        minutesOfReport +=
          this.reportService.calculateTime(
            this.dateSmen,
            control.controls.startTime.value,
            control.controls.endTime.value
          );
      }
    }
    // console.log(this.reportService.calculateTime(this.dateSmen, control.controls.startTime.value, control.controls.endTime.value));
    console.log('minutesOfReport: ' + minutesOfReport);
    return minutesOfReport;
  }

}
