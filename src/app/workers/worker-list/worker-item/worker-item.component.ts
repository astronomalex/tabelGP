import {Component, Input, OnInit} from '@angular/core';
import {WorkerData} from '../worker-data.model';

@Component({
  selector: 'app-worker-item',
  templateUrl: './worker-item.component.html',
  styleUrls: ['./worker-item.component.css']
})
export class WorkerItemComponent implements OnInit {
  @Input() wrk: WorkerData;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
