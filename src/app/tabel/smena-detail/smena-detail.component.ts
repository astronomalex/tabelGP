import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

import {Smena} from '../smen-list/smena.model';
import {WorkerData} from '../../workers/worker-list/worker-data.model';
import * as fromApp from '../../store/app.reducer';
import * as TabelActions from '../store/tabel.actions';
import {getSelectedSmena, getSelectedSmenaWorkersData} from '../../store/selectors/app.selector';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-smena-detail',
  templateUrl: './smena-detail.component.html',
  styleUrls: ['./smena-detail.component.css']
})
export class SmenaDetailComponent implements OnInit, OnDestroy {
  smena: Smena;
  id: number;
  workers: WorkerData[] = [];
  public selectedSmena: Smena;
  public selectedWorkers: WorkerData[];
  private ngUnsubscribe$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    console.log(this.selectedWorkers);
    this.route.params.pipe(
      map(
        params => {
          return +params.id;
        })
    ).subscribe(id => {
      this.id = id;
      this.store.dispatch(new TabelActions.SelectSmena(id));
    });
    this.store.pipe(select(getSelectedSmena)).pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(
      item => this.selectedSmena = item
    );
    this.store.pipe(select(getSelectedSmenaWorkersData)).pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(
      item => this.selectedWorkers = item
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onEditSmena() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteSmena() {
    this.store.dispatch(new TabelActions.DeleteSmena(this.id));
    this.router.navigate(['smen-list']);
  }


}
