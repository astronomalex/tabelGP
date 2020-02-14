import { Injectable } from '@angular/core';
import {WorkerData} from './worker-data.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerListService {
  workersChanged = new Subject<WorkerData[]>();

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

  getWorkers() {
    return this.workers;
  }

  getWorkerById(id: number) {
    return this.workers[id];
  }

  addWorker(wrk: WorkerData) {
    this.workers.push(wrk);
    this.workersChanged.next(this.workers.slice());
  }

  updateWorker(index: number, newWrk: WorkerData) {
    this.workers[index] = newWrk;
    this.workersChanged.next(this.workers.slice());
  }

  setWorkers(workers: WorkerData[]) {
    this.workers = workers;
    this.workersChanged.next(this.workers.slice());
  }

  deleteWorker(id: number) {
    this.workers.splice(id, 1);
  }
}
