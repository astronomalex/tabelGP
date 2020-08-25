import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PlaceholderDirective} from '../../shared/placeholder/placeholder.directive';
import {WorkerData} from '../../workers/worker-list/worker-data.model';
import {Subject, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import {
  getEditedReport,
  getMachineList,
  getNormsByMachine,
  getReportsFromState, getSelectedReport,
  getTypesOfWorkFromState,
  getWorkers
} from '../../store/selectors/app.selector';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import * as ReportActions from '../../report/store/report.actions';
import {WorkerSelectDialogListComponent} from '../../tabel/smen-edit/worker-select-dialog/worker-select-dialog-list-component';
import {Norma} from '../norma.model';
import {ReportService} from '../report.service';
import {DatePipe} from '@angular/common';
import {WorkUnit} from '../work-unit.model';
import {ReportEditFormService} from './report-edit-form.service';
import {Report} from '../report.model';
import {WorkUnitFormModel} from './work-unit-form.model';

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.css']
})
export class ReportEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  reportForm: FormGroup;
  report: Report;
  reportPercent = 0;
  // reportFormSub: Subscription;
  formInvalid = false;
  persentOfReport: number;
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
  report$ = this.store.pipe(select(getSelectedReport)).pipe(
    takeUntil(this.ngUnsubscribe$)
  ).subscribe(report => {
    this.report = report;
  });
  private closeSub: Subscription;
  private selectSub: Subscription;
  private selectedWorker: WorkerData = null;


  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private reportService: ReportService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
      }
    );
    this.initForm();

  }
  private initForm() {
    let dateReport = '';
    let machine = '';
    let numSmenReport = '';
    this.workUnitListFormArr = new FormArray([]);
    const workerListReport = new FormArray([]);
    const workListReport = new FormArray([]);

    if (this.editMode) {
      dateReport = this.report.dateReport;
      machine = this.report.machine;
      numSmenReport = this.report.numSmenReport;
      if (this.report.workerListReport) {
        for (const worker of this.report.workerListReport) {
          workerListReport.push(
            new FormGroup({
              tbNum: new FormControl(worker.tbNum, [Validators.required, Validators.pattern(/^\d\d\d\d$/)]),
              grade: new FormControl(worker.grade, [Validators.required, Validators.min(1), Validators.max(6)])
            })
          );
        }
      }
    }
    this.reportForm = new FormGroup({
      dateReport: new FormControl(dateReport, [Validators.required]),
      machine: new FormControl(machine, [Validators.required]),
      numSmenReport: new FormControl(numSmenReport, [Validators.required]),
      workerListReport,
      workListReport
    });
    if (this.editMode) {
      if (this.report.workListReport) {
        for (const work of this.report.workListReport) {
          this.addWork(
            work.typeWork,
            work.numOrder,
            work.nameOrder,
            work.groupDifficulty,
            work.startWorkTime,
            work.endWorkTime,
            work.amountDonePieces
          );
        }
        this.selectedWorker = null;
      }
    }
  }

  addWork(typeWork?, numOrder?, nameOrder?, groupDifficulty?, startWorkTime?, endWorkTime?, amountDonePieces?) {
    // const currentReport = this.reportForm;
    const currentWork = this.reportForm.get('workListReport') as FormArray;
    currentWork.push(
      this.fb.group(
        new WorkUnitFormModel(
          new WorkUnit(typeWork, numOrder, nameOrder, groupDifficulty, startWorkTime, endWorkTime, amountDonePieces)
        )
      )
    );
  }

  delWork(index: number) {
    const currentWorks = this.reportForm.get('workListReport') as FormArray;

    currentWorks.removeAt(index);
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

  // initWorkUnitGroup() {
  //   return new FormGroup({
  //     startTime: new FormControl(null, [Validators.required]),
  //     endTime: new FormControl(null, [Validators.required]),
  //     typeWork: new FormControl(null, [Validators.required]),
  //     numOrder: new FormControl(null, [Validators.required]),
  //     nameOrder: new FormControl(null, [Validators.required]),
  //     groupDifficulty: new FormControl(null, [Validators.required])
  //   });
  // }

  getControlsWorkers() {
    return (this.reportForm.get('workerListReport') as FormArray).controls;
  }

  getControlsWorks() {
    return (this.reportForm.get('workListReport') as FormArray).controls;
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
    this.reportPercent = this.calculateReportTime().percentOfReport;
    if (this.editMode) {
      this.store.dispatch(new ReportActions.UpdateReport({index: this.id, newReport: {
        ...this.reportForm.value, percentOfReport: this.reportPercent
      }}));
    } else {

      this.store.dispatch(new ReportActions.AddReport({
        ...this.reportForm.value, percentOfReport: this.reportPercent
      }));
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
    const date = event.value;
    this.dateSmen = this.datePipe.transform(date, 'yyyy-MM-dd');
    // console.log('dateFormated: ', dateFormated);
    // console.log('New Date: ' + dateString);
    this.calculateReportTime();
  }

  calculateReportTime(typeWork: string = null) {
    if (this.getControlsWorks().length > 0) {
      let minutesOfReport = 0;
      let percentOfReport = 0;

      for (const control of this.getControlsWorks()) {
        if (
          (control as FormGroup).controls.startWorkTime.value &&
          (control as FormGroup).controls.endWorkTime.value
        ) {
          const minutesOfWork =
            this.reportService.calculateTime(
              this.dateSmen,
              (control as FormGroup).controls.startWorkTime.value,
              (control as FormGroup).controls.endWorkTime.value
            );
          let percentOfWork = 100;
          if ((control as FormGroup).controls.groupDifficulty.value &&
            (control as FormGroup).controls.amountDonePieces &&
            (control as FormGroup).controls.typeWork.value === 'Работа') {
            const norm = (control as FormGroup).controls.groupDifficulty.value;
            console.log('selected norm: ' + norm);
            percentOfWork =
              (((control as FormGroup).controls.amountDonePieces.value / norm) * 690) / minutesOfWork * 100;
            console.log('Percent of work: ' + percentOfWork);
          }
          if (typeWork) {
            if ( typeWork === (control as FormGroup).controls.typeWork.value) {
              minutesOfReport += minutesOfWork;
            }
          } else {
            if (!((control as FormGroup).controls.typeWork.value === 'Простой')) {
              minutesOfReport += minutesOfWork;
              percentOfReport += minutesOfWork * (percentOfWork / 100);
            }
          }
        }

      }
      percentOfReport = Number((percentOfReport / minutesOfReport * 100).toFixed(2));
      console.log('minutesOfReport: ' + minutesOfReport);
      console.log('PercentOfReport: ' + percentOfReport);
      this.persentOfReport = percentOfReport;
      return { minutesOfReport, percentOfReport };
    } else {
      this.persentOfReport = 0;
      return {minutesOfReport: 0, percentOfReport: 0};
    }
  }

  calculatePercentWorks() {

  }

  ngOnDestroy() {
    // this.reportFormSub.unsubscribe();
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }



}
