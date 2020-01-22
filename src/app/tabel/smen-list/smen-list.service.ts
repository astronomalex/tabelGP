import { Injectable } from '@angular/core';
import {Smena} from './smena.model';
import {WorkerTime} from './workers-time.model';

@Injectable({
  providedIn: 'root'
})
export class SmenListService {

  private smenList: {[key: string]: Smena} = {['01012020']: new Smena('01012020', 'WPS', '1', [
      new WorkerTime('8609', 11.5, 0, 0, 0, 0),
      new WorkerTime('3527', 11.5, 0, 0, 0, 0)])
  },
    {['01012020']: new Smena('01012020', 'WPS', '1', [
      new WorkerTime('8609', 11.5, 0, 0, 0, 0),
      new WorkerTime('3527', 11.5, 0, 0, 0, 0)])
};

smensKey['05012020'] = new Smena('05012020', 'HTF-1', '1', [
    new WorkerTime('8609', 11.5, 0, 0, 0, 0),
    new WorkerTime('3527', 5.5, 0, 0, 0, 0)]);

  private smens: Smena[] = [
    new Smena('01012020', 'WPS', '1', [
      new WorkerTime('8609', 11.5, 0, 0, 0, 0),
      new WorkerTime('3527', 11.5, 0, 0, 0, 0)
    ]),
    new Smena('05012020', 'HTF-1', '1', [
      new WorkerTime('8609', 11.5, 0, 0, 0, 0),
      new WorkerTime('3527', 5.5, 0, 0, 0, 0)
    ])
  ];

constructor(); {
  }

getSmens(); {
    return this.smens;
  }

getSmena(dateSmen: string); {
    return this.smens[dateSmen];
  }
}
