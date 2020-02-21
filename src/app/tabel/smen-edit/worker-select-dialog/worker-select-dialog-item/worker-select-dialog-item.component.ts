import {Component, EventEmitter, Input, Output} from '@angular/core';
import {WorkerData} from '../../../../workers/worker-list/worker-data.model';
import {WorkerListService} from '../../../../workers/worker-list/worker-list.service';

@Component({
  selector: 'app-select-dialog-item',
  templateUrl: './worker-select-dialog-item.component.html',
  styleUrls: ['./worker-select-dialog-item.component.css']
})
export class WorkerSelectDialogItemComponent {
  value: any = null;
  @Input() wrkr: WorkerData;
  @Input() index: number;
  @Output() select = new EventEmitter<WorkerData>();

  constructor(private workerListService: WorkerListService) {
  }

  onSelect() {
    return this.workerListService.getWorkerById(this.index);
  }
}
