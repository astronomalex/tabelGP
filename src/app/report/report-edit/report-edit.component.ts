import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PlaceholderDirective} from '../../shared/placeholder/placeholder.directive';
import {WorkerData} from '../../workers/worker-list/worker-data.model';
import {Subject, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import {
  getEditedReport,
  getMachineList, getNormsByMachine,
  getNormsFromState,
  getReportsFromState,
  getTypesOfWorkFromState,
  getWorkers
} from '../../store/selectors/app.selector';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Report} from '../report.model';
import * as ReportActions from '../../report/store/report.actions';
import {WorkerSelectDialogListComponent} from '../../tabel/smen-edit/worker-select-dialog/worker-select-dialog-list-component';
import {Norma} from '../norma.model';
import {ReportService} from '../report.service';
import {DatePipe} from '@angular/common';
import {WorkUnit} from '../work-unit.model';
import {ReportEditFormService} from './report-edit-form.service';
import {TimeWorkInfo} from './time-work-Info.model';

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.css']
})
export class ReportEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  reportForm: FormGroup;
  reportFormSub: Subscription;
  formInvalid = false;
  workUnitListFormArr: FormArray;
  @ViewChild(PlaceholderDirective, {static: false}) dialogHost: PlaceholderDirective;
  workerList: WorkerData[];
  public workUnits: WorkUnit[];
  public machineList: string[];
  public typesOfWorks: string[];
  public norms: Norma[];
  public dateSmen: string;
  public selectedMachine: string;
  editedReport$ = this.store.pipe(select(getEditedReport));
  private ngUnsubscribe$ = new Subject();
  typesOfWorks$ = this.store.pipe(select(getTypesOfWorkFromState)).pipe(
    takeUntil(this.ngUnsubscribe$)
  ).subscribe(typesOfWorks => this.typesOfWorks = typesOfWorks);
  workerList$ = this.store.pipe(select(getWorkers)).pipe(
    takeUntil(this.ngUnsubscribe$)
  ).subscribe(workerList => this.workerList = workerList);
  machineList$ = this.store.pipe(select(getMachineList)).pipe(
    takeUntil(this.ngUnsubscribe$)
  ).subscribe(machineList => this.machineList = machineList);
  norms$ = this.store.pipe(select(getNormsByMachine)).pipe(
    takeUntil(this.ngUnsubscribe$)
  ).subscribe(norms => {
    this.norms = norms;
    console.log('norms: ' + norms);
  });
  private closeSub: Subscription;
  private selectSub: Subscription;
  private selectedWorker: WorkerData = null;
  private timeWorkInfoList: TimeWorkInfo [];


  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private reportService: ReportService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private reportEditFormService: ReportEditFormService
  ) {}

  ngOnInit() {
    this.reportFormSub = this.reportEditFormService.reportForm$.subscribe(report => {
      this.reportForm = report;
      this.timeWorkInfoList = [];
      this.workUnitListFormArr = this.reportForm.get('workListReport') as FormArray;
    });
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }

  private initForm() {
     this.reportForm.valueChanges.subscribe(newValues => console.log('New Values: ' + newValues));
  }

  showWorkerSelectDialog() {
    const dialogCmpFactoty = this.componentFactoryResolver.resolveComponentFactory(WorkerSelectDialogListComponent);
    const hostViewContainerRef = this.dialogHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(dialogCmpFactoty);

    this.closeSub = componentRef.instance.closeDialog.subscribe(
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

        hostViewContainerRef.clear();
        (this.reportForm.get('workerListReport') as FormArray).push(
          new FormGroup({
            tbNum: new FormControl(wrkr.tabelNum, [Validators.required, Validators.pattern(/^\d\d\d\d$/)]),
            grade: new FormControl(wrkr.grade, [Validators.required, Validators.min(1), Validators.max(6)
            ])
          })
        );
      }
    );
  }

  initWorkUnitGroup() {
    return new FormGroup({
      startTime: new FormControl(null, [Validators.required]),
      endTime: new FormControl(null, [Validators.required]),
      typeWork: new FormControl(null, [Validators.required]),
      numOrder: new FormControl(null, [Validators.required]),
      nameOrder: new FormControl(null, [Validators.required]),
      groupDifficulty: new FormControl(null, [Validators.required])
    });
  }

  getControlsWorkers() {
    return (this.reportForm.get('workerListReport') as FormArray).controls;
  }

  getWorkerByTN(tabelNum: string) {
    return this.workerList.find((item) => {
        return item.tabelNum === tabelNum;
      }
    );
  }

  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new ReportActions.UpdateReport({index: this.id, newReport: this.reportForm.value}));
    } else {
      this.store.dispatch(new ReportActions.AddReport(this.reportForm.value));
    }
    this.onCancel();
  }

  onAddWorker() {
    this.showWorkerSelectDialog();
  }

  onDeleteWorker(index: number) {
    (this.reportForm.get('workerListReport') as FormArray).removeAt(index);
  }

  onMachineChanged(event) {
    this.selectedMachine = event.value;
    this.store.dispatch(new ReportActions.SelectMachine(event.value));
    console.log('onMachineChanged norm:  ' + this.norms.values());
    console.log('event.value: ' + event.value);
  }

  onDateChanged(event) {
    const dateString = event.value.toLocaleDateString();
    const date = event.value;
    const dateFormated = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.dateSmen = dateFormated;
    // console.log('dateFormated: ', dateFormated);
    // console.log('New Date: ' + dateString);
    this.calculateReportTime();
  }

  calculateReportTime(typeWork: string = null) {
    let minutesOfReport = 0;
    if (typeWork) {
      for (const timeWorkInfo of this.timeWorkInfoList) {
        if (typeWork === timeWorkInfo.typeWork) {
          minutesOfReport += timeWorkInfo.amountMinutes;
        }
      }
    } else {
      for (const timeWorkInfo of this.timeWorkInfoList) {
        minutesOfReport += timeWorkInfo.amountMinutes;
      }
    }
    // console.log(this.reportService.calculateTime(this.dateSmen, control.controls.startTime.value, control.controls.endTime.value));
    console.log('minutesOfReport: ' + minutesOfReport);
    return minutesOfReport;
    // let minutesOfReport = 0;
    // if (typeWork && this.workUnits) {
    //   for (const workUnit of this.workUnits) {
    //     if (typeWork === workUnit.typeWork) {
    //       minutesOfReport += workUnit.getworkTime();
    //     }
    //   }
    // } else  if (this.workUnits) {
    //   for (const workUnit of this.workUnits) {
    //     minutesOfReport += workUnit.getworkTime();
    //   }
    // }
    // // console.log(this.reportService.calculateTime(this.dateSmen, control.controls.startTime.value, control.controls.endTime.value));
    // console.log('minutesOfReport: ' + minutesOfReport);
    // return minutesOfReport;
  }


  ngOnDestroy() {
    this.reportFormSub.unsubscribe();
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  addWork() {
    this.reportEditFormService.addWork();
  }

  delWork(index: number) {
    this.reportEditFormService.delWork(index);
  }

  formWorkUnitChanged(dataEvent: TimeWorkInfo) {
    this.timeWorkInfoList.push(dataEvent);
  }
}
