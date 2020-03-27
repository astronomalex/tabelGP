import {Component, OnDestroy, OnInit} from '@angular/core';
import {Smena} from './smena.model';
import {SmenListService} from './smen-list.service';
import {Subscription, Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as TabelActions from '../store/tabel.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-smen-list',
  templateUrl: './smen-list.component.html',
  styleUrls: ['./smen-list.component.css']
})
export class SmenListComponent implements OnInit, OnDestroy {
  // smens: Smena[];
  smens: Observable<{ smens: Smena[] }>;
  subscription: Subscription;

  constructor(
    private slService: SmenListService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    // this.store.dispatch(new TabelActions.FetchSmens());
    this.smens = this.store.select('tabel');
    // this.subscription = this.slService.smensCahnged.subscribe(
    //   (smens: Smena[]) => {

    //   }
    // );

    // if (this.authService.locId) {
    //   this.dataStorageService.fetchWorkers();
    //   this.dataStorageService.fetchSmens();
    // }
    // this.smens = this.store.select('tabel');
    // this.smens = this.slService.getSmens();
  }

  onNewSmena() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
