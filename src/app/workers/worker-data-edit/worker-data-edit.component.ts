import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgForm, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

import * as WorkersActions from '../store/workers.actions';
import * as TabelActions from '../../tabel/store/tabel.actions';
import * as fromApp from '../../store/app.reducer';
import {WorkerListService} from '../worker-list/worker-list.service';
import {WorkerData} from '../worker-list/worker-data.model';
import {map, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'app-worker-data-edit',
  templateUrl: './worker-data-edit.component.html',
  styleUrls: ['./worker-data-edit.component.css']
})
export class WorkerDataEditComponent implements OnInit, OnDestroy {
  // @ViewChild('f', {static: false}) wDForm: NgForm;
  workerForm: FormGroup;
  editMode = false;
  id: number;
  storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private workerListService: WorkerListService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
    (params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      // if (this.editMode && this.workerListService.getWorkers().length < this.id) {
      //   this.router.navigate(['worker-list']);
      this.initForm();
      }
    );
  }

  private initForm() {
    let tbNum = '';
    let grade = '';
    let surname = '';
    let name = '';
    let patronymic = '';

    if (this.editMode) {
      this.storeSub = this.store.select('workers')
        .pipe(
          map(
            workersState => {
              return workersState.workers.find((wrk, index) => {
                return index === this.id;
              });
            }
          )
        ).subscribe(wrk => {
          tbNum = wrk.tabelNum;
          grade = wrk.grade;
          surname = wrk.surname;
          name = wrk.name;
          patronymic = wrk.patronymic;
        });
    }
    this.workerForm = new FormGroup({
      'tabelNum': new FormControl(tbNum, [Validators.required, this.tabelNumValidator(), Validators.pattern(/^\d\d\d\d$/)]),
      'grade': new FormControl(grade, [Validators.min(1), Validators.max(6)]),
      'surname': new FormControl(surname, Validators.required),
      'name': new FormControl(name, Validators.required),
      'patronymic': new FormControl(patronymic)
    });
  }

  onSubmit() {
    // const value = form.value;
    // const newWorkerData = new WorkerData(value.tbNum, value.surname, value.name, value.patronymic, value.grade);
    if (this.editMode) {
      // this.workerListService.updateWorker(this.id, this.workerForm.value);
      this.store.dispatch(new WorkersActions.UpdateWorkerData({
        index: this.id,
        newWorkerData: this.workerForm.value
      }));
    } else {
      // this.workerListService.addWorker(this.workerForm.value);
      this.store.dispatch(new WorkersActions.AddWorkerData(this.workerForm.value));
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  tabelNumValidator(): ValidatorFn {
    let workerCont: WorkerData = null;
    let workerData: WorkerData = null;

    return (control: AbstractControl): { [key: string]: boolean } | null => {
      this.store.select('workers').pipe(
        map(workersState => {
          return [
            workersState.workers.find((wrk, index) => {
              return wrk.tabelNum === control.value;
            }),
            workersState.workers.find((wrk, index) => {
              return index === control.value;
            })
          ];
        })
      ).subscribe(([wrk, wrkContr]) => {
        workerData = wrk;
        workerCont = wrkContr;
      });


      //   const valid = !(
      //     this.workerListService.getWorkerByTN(control.value) &&
      //     (this.workerListService.getWorkerByTN(control.value) !== this.workerListService.getWorkerById(this.id))
      //   );
      //   console.log(this.workerForm);
      //   return (valid) ? null : {tabelNumExist: true};
      if (!workerData) {
        return null;
      } else {
        if (workerCont === workerData) {
          return null;
        } else {
          return {tabelNumExist: true};
        }
      }
    };
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}

