import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';
import {SmenListService} from '../tabel/smen-list/smen-list.service';
import {WorkerListService} from '../workers/worker-list/worker-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubs: Subscription;

  constructor(
    private dataStorageSevice: DataStorageService,
    private smenListService: SmenListService,
    private workerListService: WorkerListService
  ) { }

  onSaveData() {
    this.dataStorageSevice.storeSmens();
    this.dataStorageSevice.storeWorkers();
  }

  onFetchData() {
    this.dataStorageSevice.fetchSmens().subscribe();
    this.dataStorageSevice.fetchWorkers().subscribe();
  }
  onSaveWorkers() {
    this.dataStorageSevice.storeWorkers();
  }

  onFetchWorkers() {
    this.dataStorageSevice.fetchWorkers().subscribe();
  }
  onSaveSmens() {
    this.dataStorageSevice.storeSmens();
  }

  onFetchSmens() {
    this.dataStorageSevice.fetchSmens().subscribe();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
}
