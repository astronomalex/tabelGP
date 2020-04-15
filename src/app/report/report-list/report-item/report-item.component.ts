import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import {Report} from '../../report.model';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.css']
})
export class ReportItemComponent implements OnInit {
  @Input() report: Report;
  @Input() index: number;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
  }
  onItemClick(payload: number) {
    // this.store.dispatch()
  }
}
