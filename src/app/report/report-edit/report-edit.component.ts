import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {PlaceholderDirective} from '../../shared/placeholder/placeholder.directive';
import {WorkerData} from '../../workers/worker-list/worker-data.model';
import {Subject, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import {
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
  public machineList: string[];
  public typesOfWorks: string[];
  public norms: Norma[];
  public dateSmen: string;
  public selectedMachine: string;
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
    const workUnitList = new FormArray([]);

    if (this.editMode) {
      let report: Report;
      this.store.pipe(select(getReportsFromState)).pipe(
        takeUntil(this.ngUnsubscribe$)
      ).subscribe(reports => report = reports[this.id]);
      dateReport = report.dateReport;
      machineReport = report.maschine;
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
      if (report.workListReport) {
        for (const work of report.workListReport) {
          workUnitList.push(
            new FormGroup({
              startTime: new FormControl(work.startWorkTime, [Validators.required]),
              endTime: new FormControl(work.endWorkTime, [Validators.required]),
              typeWork: new FormControl(work.typeWork, [Validators.required]),
              numOrder: new FormControl(work.numOrder, [Validators.required]),
              nameOrder: new FormControl(work.nameOrder, [Validators.required]),
              groupDifficulty: new FormControl(work.groupDifficulty, [Validators.required])
            })
          );
        }
        this.selectedWorker = null;
      }
    }

    this.reportForm = new FormGroup({
      dateReport: new FormControl(dateReport, [Validators.required]),
      machineReport: new FormControl(machineReport, [Validators.required]),
      numSmenReport: new FormControl(numSmenReport, [Validators.required]),
      workerFormList,
      workUnitList
    });
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

  getControlsWorkUnits() {
    return (this.reportForm.get('workUnitList') as FormArray).controls;
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

  onAddWorkUnit() {
    (this.reportForm.get('workUnitList') as FormArray).push(
      new FormGroup({
        startTime: new FormControl(null, [Validators.required]),
        endTime: new FormControl(null, [Validators.required]),
        typeWork: new FormControl(null, [Validators.required]),
        numOrder: new FormControl(null, [Validators.required]),
        nameOrder: new FormControl(null, [Validators.required]),
        groupDifficulty: new FormControl(null, [Validators.required])
      })
    );
  }

  onDeleteWorkUnit(index: number) {
    (this.reportForm.get('workUnitList') as FormArray).removeAt(index);
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
    console.log('dateFormated: ', dateFormated);
    console.log('New Date: ' + dateString);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
