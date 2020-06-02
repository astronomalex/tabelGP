import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReportService} from '../../report.service';

@Component({
  selector: 'app-work-unit-list',
  templateUrl: './work-unit-list.component.html',
  styleUrls: ['./work-unit-list.component.css']
})
export class WorkUnitListComponent implements OnInit {
  @Input() dateSmen: string;
  @Input() reportForm: FormGroup;
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

  onAddWorkUnit() {
    (this.reportForm.get('workUnitList') as FormArray).push(
      new FormGroup({
        startTime: new FormControl(null, [Validators.required]),
        endTime: new FormControl(null, [Validators.required]),
        typeWork: new FormControl(null, [Validators.required]),
        numOrder: new FormControl(null, [Validators.required]),
        nameOrder: new FormControl(null, [Validators.required]),
        groupDifficulty: new FormControl(null, [Validators.required])
      })
    );
  }
}
