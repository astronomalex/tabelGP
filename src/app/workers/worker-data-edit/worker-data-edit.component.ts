import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WorkerListService} from '../worker-list/worker-list.service';

@Component({
  selector: 'app-worker-data-edit',
  templateUrl: './worker-data-edit.component.html',
  styleUrls: ['./worker-data-edit.component.css']
})
export class WorkerDataEditComponent implements OnInit {
  workerForm: FormGroup;
  editMode = false;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private workerListService: WorkerListService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        if (this.editMode && this.workerListService.getWorkers().length < this.id) {
          this.router.navigate(['worker-list']);
        }
      }
    );

      this.initForm();


  }

  initForm() {
    let tbNum = '';
    let grade = '';
    let surname = '';
    let name = '';
    let patronymic = '';

    if (this.editMode) {
      const workerData = this.workerListService.getWorkerById(this.id);
      tbNum = workerData.tabelNum;
      grade = workerData.grade;
      surname = workerData.surname;
      name = workerData.name;
      patronymic = workerData.patronymic;
    }
    this.workerForm = new FormGroup({
      'tabelNum': new FormControl(tbNum, [Validators.required, this.tabelNumValidator(), Validators.pattern(/^\d\d\d\d$/)]),
      'grade': new FormControl(grade, [Validators.min(1), Validators.max(6)]),
      'surname': new FormControl(surname, Validators.required),
      'name': new FormControl(name, Validators.required),
      'patronymic': new FormControl(patronymic)
    });
    // if (this.editMode) {
    //   });
    // } else {
    //   this.workerForm = new FormGroup({
    //     'tabelNum': new FormControl(tbNum, [Validators.required, this.tabelNumValidator(), Validators.pattern(/^\d\d\d\d$/)]),
    //     'grade': new FormControl(grade),
    //     'surname': new FormControl(surname, Validators.required),
    //     'name': new FormControl(name, Validators.required),
    //     'patronymic': new FormControl(patronymic)
    //   });
    // }
  }

  onSubmit() {
    if (this.editMode) {
      this.workerListService.updateWorker(this.id, this.workerForm.value);
    } else {
      this.workerListService.addWorker(this.workerForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  tabelNumValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
      if (!this.workerListService.getWorkerByTN(control.value)) {
        return null;
      } else {
        if (this.workerListService.getWorkerByTN(control.value) === this.workerListService.getWorkerById(this.id)) {
          return null;
        } else {
          return {tabelNumExist: true};
        }
      }
    //   const valid = !(
    //     this.workerListService.getWorkerByTN(control.value) &&
    //     (this.workerListService.getWorkerByTN(control.value) !== this.workerListService.getWorkerById(this.id))
    //   );
    //   console.log(this.workerForm);
    //   return (valid) ? null : {tabelNumExist: true};
     };
  }

}
