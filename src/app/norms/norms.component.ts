import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getMachineList, getNormsByMachine, getSelectedMachine} from '../store/selectors/app.selector';
import {map, takeUntil} from 'rxjs/operators';
import {AppState} from '../store/app.reducer';
import * as ReportActions from '../report/store/report.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {Norma} from '../report/norma.model';

@Component({
  selector: 'app-norms',
  templateUrl: './norms.component.html',
  styleUrls: ['./norms.component.css']
})
export class NormsComponent implements OnInit, OnDestroy {
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
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      map(params => {
        return params.machine;
      })
    ).subscribe(machine => {
      this.store.dispatch(new ReportActions.SelectMachine(machine));
    });
  }

  onMachineChanged(event) {
    this.store.dispatch(new ReportActions.SelectMachine(event.value));
    this.router.navigate(['norm-list', event.value]);
  }

  oNN() {
    this.router.navigate(['norm-list', this.selectedMachine, 'new']);
  }

  onNewNorm() {
    console.log('New Norm Fired');
    this.router.navigate(['norm-list', this.selectedMachine, 'new']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
