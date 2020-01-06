import { Injectable } from '@angular/core';
import {WorkerModel} from './worker.model';

@Injectable({
  providedIn: 'root'
})
export class WorkerListService {
  private workers: WorkerModel[] = [
    new WorkerModel('8609','Щитков','Александр', 'Николаевич', '5'),
    new WorkerModel('3527', 'Кретова', 'Ольга', 'Николаевна', '2')
  ]

  constructor() { }
}
