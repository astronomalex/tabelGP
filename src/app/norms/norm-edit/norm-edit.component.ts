import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {Norma} from '../../report/norma.model';
import {getSelectedNorma} from '../../store/selectors/app.selector';
import {map, takeUntil} from 'rxjs/operators';
import * as NormsActions from '../store/norms.action';

@Component({
  selector: 'app-norm-edit',
  templateUrl: './norm-edit.component.html',
  styleUrls: ['./norm-edit.component.css']
})
export class NormEditComponent implements OnInit, OnDestroy {
  normForm: FormGroup;
  editMode = false;
  groupDiff: string;
  machine: string;
  norma: Norma;
  private ngUnsubscribe$ = new Subject();
  norma$ = this.store.pipe(select(getSelectedNorma)).pipe(
    takeUntil(this.ngUnsubscribe$)
  ).subscribe(norma => {
    this.norma = norma;
  });

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
      this.machine = machine;
      this.store.dispatch(new NormsActions.SelectNorm({machine: this.machine, groupDiff}));
    });
    this.store.pipe(select(getSelectedNorma)).pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(
      norma => this.norma = norma
    );
    this.initForm();
  }

  initForm() {
    let grpDiff = '';
    let norma = 0;

    if (this.editMode) {
      grpDiff = this.norma.grpDiff;
      norma = this.norma.norma;
    }
    this.normForm = new FormGroup({
      groupDiff: new FormControl(grpDiff, [Validators.required, Validators.min(1), Validators.max(80)]),
      norma: new FormControl(norma, [Validators.required])
    });
  }

  onSubmit() {
    this.store.dispatch(new NormsActions.AddNorm({machine: this.machine, norma: this.norma}));
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['..', '..'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
