import { Injectable } from '@angular/core';
import {WorkerData} from './worker-data.model';

@Injectable({
  providedIn: 'root'
})
export class WorkerListService {
  private workers: WorkerData[] = [
    new WorkerData('8609', 'Щитков', 'Александр', 'Николаевич', '5'),
    new WorkerData('3527', 'Кретова', 'Ольга', 'Николаевна', '2')
  ];

  constructor() { }

  getWorkerByTN(tabelNum: string) {
    for (const wrk of this.workers) {
      if (wrk.tabelNum === tabelNum) {
        return wrk;
      }
    }
    return null;
  }
}
