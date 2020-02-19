import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';
import {SmenListService} from '../tabel/smen-list/smen-list.service';
import {WorkerListService} from '../workers/worker-list/worker-list.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubs: Subscription;
  isAuthenticated: false;

  constructor(
    private dataStorageSevice: DataStorageService,
    private smenListService: SmenListService,
    private workerListService: WorkerListService,
    private authService: AuthService
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
    this.userSubs = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      }
    )
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
}
