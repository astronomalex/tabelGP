import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SmenListService} from '../smen-list/smen-list.service';
import {PlaceholderDirective} from '../../shared/placeholder/placeholder.directive';
import {WorkerSelectDialogListComponent} from './worker-select-dialog/worker-select-dialog-list-component';
import {Subscription} from 'rxjs';
import {WorkerData} from '../../workers/worker-list/worker-data.model';

@Component({
  selector: 'app-smen-edit',
  templateUrl: './smen-edit.component.html',
  styleUrls: ['./smen-edit.component.css']
})
export class SmenEditComponent implements OnInit {
  id: number;
  editMode = false;
  smenForm: FormGroup;
  @ViewChild(PlaceholderDirective, {static: false}) dialogHost: PlaceholderDirective;

  private closeSub: Subscription;
  private selectSub: Subscription;
  private selectedWorker: WorkerData = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private smenListService: SmenListService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onSubmit() {
    if (this.editMode) {
      this.smenListService.updateSmena(this.id, this.smenForm.value);
    } else {
      this.smenListService.addSmena(this.smenForm.value);
    }
    this.onCancel();
  }

  onAddWorkerTime() {
    (<FormArray> this.smenForm.get('workersTime')).push(
      new FormGroup({
        'tbNum': new FormControl(this.selectedWorker ? this.selectedWorker.tabelNum: null , [Validators.required, Validators.pattern(/^\d\d\d\d$/)]),
        'grade': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(6)]),
        'sdelTime': new FormControl(null, [Validators.min(0), Validators.max(11.5)]),
        'nightTime': new FormControl(null, [Validators.min(0), Validators.max(11.5)]),
        'prostTime': new FormControl(null, [Validators.min(0), Validators.max(11.5)]),
        'prikTime': new FormControl(null, [Validators.min(0), Validators.max(11.5)]),
        'srednTime': new FormControl(null, [Validators.min(0), Validators.max(11.5)])
      })
    );
    this.showWorkerSelectDialog();
  }

  private initForm() {
    let dateSmen = '';
    let mashine = '';
    let numSmen = '';
    let workersTime = new FormArray([]);

    if (this.editMode) {
      const smena = this.smenListService.getSmenById(this.id);
      dateSmen = smena.dateSmen;
      mashine = smena.mashine;
      numSmen = smena.numSmen;
      if (smena['workersTime']) {
        for (let wrk of smena.workersTime) {
          workersTime.push(
            new FormGroup({
              'tbNum': new FormControl(wrk.tbNum, [Validators.required, Validators.pattern(/^\d\d\d\d$/)]),
              'grade': new FormControl(wrk.grade, [Validators.required, Validators.min(1), Validators.max(6)]),
              'sdelTime': new FormControl(wrk.sdelTime, [Validators.min(0), Validators.max(11.5)]),
              'nightTime': new FormControl(wrk.nightTime, [Validators.min(0), Validators.max(11.5)]),
              'prostTime': new FormControl(wrk.prostTime, [Validators.min(0), Validators.max(11.5)]),
              'prikTime': new FormControl(wrk.prikTime, [Validators.min(0), Validators.max(11.5)]),
              'srednTime': new FormControl(wrk.srednTime, [Validators.min(0), Validators.max(11.5)])
            })
          );
          this.selectedWorker = null;
        }
      }
    }

    this.smenForm = new FormGroup({
      'dateSmen': new FormControl(dateSmen, Validators.required),
      'mashine': new FormControl(mashine, Validators.required),
      'numSmen': new FormControl(numSmen, Validators.required),
      'workersTime': workersTime
    });
  }

  getControls() {
    return (<FormArray> this.smenForm.get('workersTime')).controls;
  }

  onDeleteWorkTime(index: number) {
    (<FormArray> this.smenForm.get('workersTime')).removeAt(index);
  }

  showWorkerSelectDialog() {
    const dialogCmpFactoty = this.componentFactoryResolver.resolveComponentFactory(WorkerSelectDialogListComponent);
    const hostViewContainerRef = this.dialogHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(dialogCmpFactoty);

    this.closeSub = componentRef.instance.close.subscribe(
      () => {
        this.closeSub.unsubscribe();
        this.selectSub.unsubscribe();
        hostViewContainerRef.clear();
      }
    );

    this.selectSub = componentRef.instance.selectedWorker.subscribe(
      (wrkr: WorkerData) => {
        this.selectSub.unsubscribe();
        this.closeSub.unsubscribe();
        this.selectedWorker = wrkr;
      }
    );
  }

}
