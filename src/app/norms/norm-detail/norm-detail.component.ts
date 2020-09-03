import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {map, takeUntil} from 'rxjs/operators';
import * as NormsActions from '../store/norms.action';
import {Norma} from '../../report/norma.model';
import {Subject} from 'rxjs';
import {getSelectedNorma} from '../../store/selectors/app.selector';

@Component({
  selector: 'app-norm-detail',
  templateUrl: './norm-detail.component.html',
  styleUrls: ['./norm-detail.component.css']
})
export class NormDetailComponent implements OnInit, OnDestroy {
  groupDiff: string;
  machine: string;
  public norma: Norma;
  private ngUnsubscribe$ = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      map(params => {
        return [params.groupDiff, params.machine];
      })
    ).subscribe(([groupDiff, machine]) => {
      this.groupDiff = groupDiff;
      this.machine = machine;
      this.store.dispatch(new NormsActions.SelectNorm({machine: this.machine, groupDiff}));
    });
    this.store.pipe(select(getSelectedNorma)).pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(
      norma => this.norma = norma
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onEditNorm() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
