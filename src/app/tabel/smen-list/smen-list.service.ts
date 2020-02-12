import { Injectable } from '@angular/core';
import {Smena} from './smena.model';
import {WorkerTime} from '../../workers/worker-list/workers-time.model';

@Injectable({
  providedIn: 'root'
})
export class SmenListService {

//   private smenList: {[key: string]: Smena} = {['01012020']: new Smena('01012020', 'WPS', '1', [
//       new WorkerTime('8609', 11.5, 0, 0, 0, 0),
//       new WorkerTime('3527', 11.5, 0, 0, 0, 0)])
//   },
//     {['01012020']: new Smena('01012020', 'WPS', '1', [
//       new WorkerTime('8609', 11.5, 0, 0, 0, 0),
//       new WorkerTime('3527', 11.5, 0, 0, 0, 0)])
// };
//
//   smensKey['05012020'] = new Smena('05012020', 'HTF-1', '1', [
//     new WorkerTime('8609', 11.5, 0, 0, 0, 0),
//     new WorkerTime('3527', 5.5, 0, 0, 0, 0)]);

  private smens: Smena[] = [
    new Smena(new Date(2020, 2, 3).toDateString(), 'WPS', '1', [
      new WorkerTime('8609', '5', 11.5, 0, 0, 0, 0),
      new WorkerTime('3527', '2', 8, 0, 0, 0, 0)
    ]),
    new Smena(new Date(2020, 0, 23).toDateString(), 'HTF-1', '1', [
      new WorkerTime('8609', '5', 11.5, 0, 0, 0, 0),
      new WorkerTime('3527', '2', 5.5, 0, 0, 0, 0)
    ])
  ];

  constructor() {
  }

  getSmens() {
    console.log(this.smens);
    return this.smens;
  }

  // getSmenByDate(dateSm: string) {
  //   let res: Smena[] = [];
  //   for (let smena of this.getSmens()) {
  //     if (smena.dateSmen === dateSm) {
  //       res.push(smena);
  //     }
  //   }
  //   return res.slice();
  // }

  getSmenById(id: number) {
    return this.smens[id];
  }

}
