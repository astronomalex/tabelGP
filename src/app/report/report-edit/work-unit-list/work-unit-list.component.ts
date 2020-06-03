import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReportService} from '../../report.service';
import {Norma} from '../../norma.model';

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
  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
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
