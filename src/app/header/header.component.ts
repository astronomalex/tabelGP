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
  }

  onFetchData() {
    this.dataStorageSevice.fetchSmens();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
