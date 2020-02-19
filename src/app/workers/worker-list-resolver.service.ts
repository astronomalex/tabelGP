import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {DataStorageService} from '../shared/data-storage.service';
import {WorkerData} from './worker-list/worker-data.model';
import {WorkerListService} from './worker-list/worker-list.service';

@Injectable({providedIn: 'root'})
export class WorkerListResolverService implements Resolve<WorkerData[]> {
  constructor(
    private dataStorageSevice: DataStorageService,
    private workerListService: WorkerListService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const wrks = this.workerListService.getWorkers();

    if (wrks.length === 0) {
      return this.dataStorageSevice.fetchWorkers();
    } else {
      return wrks;
    }
  }
}
