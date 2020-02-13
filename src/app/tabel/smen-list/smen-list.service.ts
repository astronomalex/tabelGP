import { Injectable } from '@angular/core';
import {Smena} from './smena.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmenListService {
  smensCahnged = new Subject<Smena[]>();

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

  private smens: Smena[] = [];

  // private smens: Smena[] = [
  //   new Smena(new Date(2020, 2, 3).toLocaleDateString(), 'WPS', '1', [
  //     new WorkerTime('8609', '5', 11.5, 0, 0, 0, 0),
  //     new WorkerTime('3527', '2', 8, 0, 0, 0, 0)
  //   ]),
  //   new Smena(new Date(2020, 0, 23).toLocaleDateString(), 'HTF-1', '1', [
  //     new WorkerTime('8609', '5', 11.5, 0, 0, 0, 0),
  //     new WorkerTime('3527', '2', 5.5, 0, 0, 0, 0)
  //   ])
  // ];

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
    console.log(this.smens[id].dateSmen);
    return this.smens[id];
  }

  updateSmena(index: number, newSmena: Smena) {
    this.smens[index] = newSmena;
    this.smensCahnged.next(this.smens.slice());
  }

  addSmena(smena: Smena) {
    this.smens.push(smena);
    this.smensCahnged.next(this.smens.slice());
  }

  deleteSmena(index: number) {
    this.smens.splice(index, 1);
    this.smensCahnged.next(this.smens.slice());
  }

  setSmens(smens: Smena[]) {
    this.smens = smens;
    this.smensCahnged.next(smens.slice());
  }
}
