import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Norma} from '../../report/norma.model';
import {select, Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as ReportActions from '../../report/store/report.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {getMachineList, getNormsByMachine, getNormsFromState, getSelectedMachine} from '../../store/selectors/app.selector';
import {map, takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-norm-list',
  templateUrl: './norm-list.component.html',
  styleUrls: ['./norm-list.component.css']
})
export class NormListComponent implements OnInit, OnDestroy {
  normsObs: Observable<{ [machine: string]: Norma[] }>;
  norms: Norma[];
  private ngUnsubscribe$ = new Subject();
  public machineList: string[];
  selectedMachine: string;
  machineList$ = this.store.pipe(
    select(getMachineList)
  ).pipe(
    takeUntil(this.ngUnsubscribe$)
  ).subscribe(machineList => {
    this.machineList = machineList;
  });
  norms$ = this.store.pipe(
    select(getNormsByMachine)
  ).pipe(
    takeUntil(this.ngUnsubscribe$)
  ).subscribe(norms => {
    this.norms = norms;
  });
  selectedMachine$ = this.store.pipe(
    select(getSelectedMachine)
  ).pipe(
    takeUntil(this.ngUnsubscribe$)
  ).subscribe(selectedMachine => {
    this.selectedMachine = selectedMachine;
  });

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      map(params => {
        return params.machine;
      })
    ).subscribe(machine => {
      this.store.dispatch(new ReportActions.SelectMachine(machine));
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onNewNorma() {
    this.router.navigate(['norm-list', 'new', this.selectedMachine]);
  }

  // onMachineChanged(event) {
  //   this.store.dispatch(new ReportActions.SelectMachine(event.value));
  //   this.router.navigate(['norm-list', event.value]);
  //
  // }
}
