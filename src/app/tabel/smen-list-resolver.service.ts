import {Injectable} from '@angular/core';
import {Smena} from './smen-list/smena.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {DataStorageService} from '../shared/data-storage.service';
import {SmenListService} from './smen-list/smen-list.service';

@Injectable({providedIn: 'root'})
export class SmenListResolverService implements Resolve<Smena[]> {
  constructor(
      private dataStorageSevice: DataStorageService,
      private smenListService: SmenListService
    ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const smens = this.smenListService.getSmens();

    if (smens.length === 0) {
      return this.dataStorageSevice.fetchData();
    } else {
      return smens;
    }
  }
}
