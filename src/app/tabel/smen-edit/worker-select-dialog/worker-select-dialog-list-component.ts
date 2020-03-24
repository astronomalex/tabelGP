import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {WorkerListService} from '../../../workers/worker-list/worker-list.service';
import {WorkerData} from '../../../workers/worker-list/worker-data.model';
import {PlaceholderDirective} from '../../../shared/placeholder/placeholder.directive';
import {AppState} from '../../../store/app.reducer';
import {select, Store} from '@ngrx/store';
import {getWorkers} from '../../selectors/app.selector';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-worker-select-dialog-list',
  templateUrl: './worker-select-dialog-list.component.html',
  styleUrls: ['./worker-select-dialog-list.component.css']
})
export class WorkerSelectDialogListComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<void>();
  @Output() selectedWorker = new EventEmitter<WorkerData>();
  @ViewChild(PlaceholderDirective, {static: false}) workerItem: PlaceholderDirective;
  private ngUnsubscribe$ = new Subject();
  public workers: WorkerData[] = [];
  public workers$ = this.store.pipe(select(getWorkers)).pipe(
    takeUntil(this.ngUnsubscribe$)
  ).subscribe(workerList => this.workers = workerList
  );

  constructor(
    public workerListService: WorkerListService,
    public store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
  }

  onClose() {
    this.close.emit();
  }

  onSelect(index: number) {
    this.selectedWorker.emit(this.workerListService.getWorkerById(index));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
