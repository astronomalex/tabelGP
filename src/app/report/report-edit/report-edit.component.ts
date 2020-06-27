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

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.css']
})
export class ReportEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  reportForm: FormGroup;
  @ViewChild(PlaceholderDirective, {static: false}) dialogHost: PlaceholderDirective;
  workerList: WorkerData[];
  public workUnits: WorkUnit[] = [new WorkUnit('', '', '', '', Date.parse('25 May 2020 07:30'), Date.parse('25 May 2020 07:31'))];
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


  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private reportService: ReportService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let dateReport = '';
    let machineReport = '';
    let numSmenReport = '';
    const workerFormList = new FormArray([]);
    // const workUnitList = new FormArray([]);

    if (this.editMode) {
      let report: Report;
      this.store.pipe(select(getReportsFromState)).pipe(
        takeUntil(this.ngUnsubscribe$)
      ).subscribe(reports => report = reports[this.id]);
      dateReport = report.dateReport;
      machineReport = report.machine;
      numSmenReport = report.numSmenReport;
      if (report.workerListTabelNums) {
        for (const tabelNum of report.workerListTabelNums) {
          workerFormList.push(
            new FormGroup({
              tbNum: new FormControl(tabelNum, [Validators.required, Validators.pattern(/^\d\d\d\d$/)])
            })
          );
        }
      }
    }

    this.reportForm = new FormGroup({
      dateReport: new FormControl(dateReport, [Validators.required]),
      machineReport: new FormControl(machineReport, [Validators.required]),
      numSmenReport: new FormControl(numSmenReport, [Validators.required]),
      workerFormList
    });
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
        (this.reportForm.get('workerFormList') as FormArray).push(
          new FormGroup({
            tbNum: new FormControl(wrkr.tabelNum, [Validators.required, Validators.pattern(/^\d\d\d\d$/)]),
            grade: new FormControl(wrkr.grade, [Validators.required, Validators.min(1), Validators.max(6)
            ])
          })
        );
      }
    );
  }

  getControlsWorkers() {
    return (this.reportForm.get('workerFormList') as FormArray).controls;
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
    (this.reportForm.get('workerFormList') as FormArray).removeAt(index);
  }

  onDeleteWorkUnit(index: number) {
    this.workUnits.splice(index, 1);
  }

  onAddWorkUnit() {
    this.workUnits.push(new WorkUnit(this.typesOfWorks[0], '', '', this.norms[0].grpDiff, Date.now(), Date.now()));
  }

  onMachineChanged(event) {
    this.selectedMachine = event.value;
    this.store.dispatch(new ReportActions.SelectMachine(event.value));
    console.log('onMachineChanged norm:  ' + this.norms);
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
      for (const workUnit of this.workUnits) {
        if (typeWork === workUnit.typeWork) {
          minutesOfReport += workUnit.getworkTime();
        }
      }
    } else {
      for (const workUnit of this.workUnits) {
        minutesOfReport += workUnit.getworkTime();
      }
    }
    // console.log(this.reportService.calculateTime(this.dateSmen, control.controls.startTime.value, control.controls.endTime.value));
    console.log('minutesOfReport: ' + minutesOfReport);
    return minutesOfReport;
  }


  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }


}
