import { Component, OnInit } from '@angular/core';
import {Smena} from './smena.model';
import {SmenListService} from './smen-list.service';

@Component({
  selector: 'app-smen-list',
  templateUrl: './smen-list.component.html',
  styleUrls: ['./smen-list.component.css']
})
export class SmenListComponent implements OnInit {
  smens: Smena[];

  constructor(private slService: SmenListService) { }

  ngOnInit() {
    this.smens = this.slService.getSmens();
  }

  onGetSmen(dateSmen: string) {
    return
  }
}
