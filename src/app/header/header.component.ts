import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {map, takeUntil} from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as TabelActions from '../tabel/store/tabel.actions';
import * as WorkerActions from '../workers/store/workers.actions';
import * as ReportActions from '../report/store/report.actions';
import * as NormsActions from '../norms/store/norms.action';
import {getSmensFromState, getWorkers} from '../store/selectors/app.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubs: Subscription;
  isAuthenticated = false;
  userEmail: string;
  workersLength: number;
  smenListLength: number;
  private ngUsubscribe$ = new Subject();

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  onSaveData() {
    this.store.dispatch(new WorkerActions.StoreWorkers());
    this.store.dispatch(new TabelActions.StoreSmens());
    this.store.dispatch(new ReportActions.StoreReport());
    this.store.dispatch(new NormsActions.StoreNorms());
    // this.dataStorageSevice.storeSmens();
    // this.dataStorageSevice.storeWorkers();
  }

  onFetchData() {
    this.store.dispatch(new WorkerActions.FetchWorkers());
    this.store.dispatch(new TabelActions.FetchSmens());
    this.store.dispatch(new ReportActions.FetchReports());
    this.store.dispatch(new NormsActions.FetchNorms());
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
    // this.smenListLength = this.store.select('tabel').pipe(
    //   map(tabelState => tabelState.smens.length)
    // );
    this.store.pipe(select(getWorkers)).pipe(
      takeUntil(this.ngUsubscribe$)
    ).subscribe(workerList => this.workersLength = workerList.length);
    this.store.pipe(select(getSmensFromState)).pipe(
      takeUntil(this.ngUsubscribe$)
    ).subscribe(smenList => this.smenListLength = smenList.length);
    // this.workersLength = this.store.select('workers').pipe(
    //   map(workersState => workersState.workers.length)
    // );
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
    this.ngUsubscribe$.next();
    this.ngUsubscribe$.complete();
  }
}
