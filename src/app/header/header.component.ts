import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as TabelActions from '../tabel/store/tabel.actions';
import * as WorkerActions from '../workers/store/workers.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubs: Subscription;
  isAuthenticated = false;
  userEmail: string;
  workersLength: Observable<number>;
  smenListLength: Observable<number>;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  onSaveData() {
    this.store.dispatch(new WorkerActions.StoreWorkers());
    this.store.dispatch(new TabelActions.StoreSmens());
    // this.dataStorageSevice.storeSmens();
    // this.dataStorageSevice.storeWorkers();
  }

  onFetchData() {
    this.store.dispatch(new WorkerActions.FetchWorkers());
    this.store.dispatch(new TabelActions.FetchSmens());
    // this.dataStorageSevice.fetchSmens().subscribe();
    // this.dataStorageSevice.fetchWorkers().subscribe();
  }
  onSaveWorkers() {
    // this.dataStorageSevice.storeWorkers();
  }

  onFetchWorkers() {
    // this.dataStorageSevice.fetchWorkers().subscribe();
  }
  onSaveSmens() {
    // this.dataStorageSevice.storeSmens();
  }

  onFetchSmens() {
    // this.dataStorageSevice.fetchSmens().subscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
    // this.authService.logout();
  }

  ngOnInit() {
    // this.authService.user.subscribe(user => {
    //   this.isAuthenticated = !user ? false : true;
    // });
    this.smenListLength = this.store.select('tabel').pipe(
      map(tabelState => tabelState.smens.length)
    );
    this.workersLength = this.store.select('workers').pipe(
      map(workersState => workersState.workers.length)
    );
    this.userSubs = this.store.select('auth').pipe(
      map(authState => authState.user)
    ).subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      if (this.isAuthenticated) {
        this.userEmail = user.email;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
}
