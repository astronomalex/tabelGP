import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
      'tabelNum': new FormControl(tbNum, Validators.required),
      'grade': new FormControl(grade),
      'surname': new FormControl(surname, Validators.required),
      'name': new FormControl(name, Validators.required),
      'patronymic': new FormControl(patronymic)
    });
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

}
