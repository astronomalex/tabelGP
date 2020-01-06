import { Injectable } from '@angular/core';
import {Smena} from './smena.model';
import {WorkersTime} from './workers-time.model';

@Injectable({
  providedIn: 'root'
})
export class SmenListService {
  private smens: Smena[] = [
    new Smena('01012020', 'WPS', '1', [
      new WorkersTime('8609', 11.5, 0, 0, 0, 0),
      new WorkersTime('3527', 11.5, 0, 0, 0, 0)
    ]),
    new Smena('05012020', 'HTF-1', '1', [
      new WorkersTime('8609', 11.5, 0, 0, 0, 0),
      new WorkersTime('3527', 5.5, 0, 0, 0, 0)
    ])
  ];

  constructor() {
  }

  getSmens() {
    return this.smens;
  }

  getSmena(dateSmen: string) {
    return this.smens[dateSmen];
  }
}
