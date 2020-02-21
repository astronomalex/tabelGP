import {Component, ComponentFactoryResolver, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {WorkerListService} from '../../../workers/worker-list/worker-list.service';
import {Subscription} from 'rxjs';
import {WorkerData} from '../../../workers/worker-list/worker-data.model';
import {PlaceholderDirective} from '../../../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-worker-select-dialog-list',
  templateUrl: './worker-select-dialog-list.component.html',
  styleUrls: ['./worker-select-dialog-list.component.css']
})
export class WorkerSelectDialogListComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<void>();
  @Output() selectedWorker = new EventEmitter<WorkerData>();
  @ViewChild(PlaceholderDirective, {static: false}) workerItem: PlaceholderDirective;

  private select: Subscription;

  constructor(
    private workerListService: WorkerListService
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

  }
}
