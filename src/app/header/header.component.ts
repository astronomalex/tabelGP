import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubs: Subscription;

  constructor(
    private dataStorageSevice: DataStorageService
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
