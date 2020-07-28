import {FormControl} from '@angular/forms';
import {WorkUnit} from '../work-unit.model';
import {createPerformWatchHost} from '@angular/compiler-cli/src/perform_watch';

export class WorkUnitFormModel {
  startWorkTime = new FormControl();
  endWorkTime = new FormControl();
  typeWork = new FormControl();
  numOrder = new FormControl();
  nameOrder = new FormControl();
  groupDifficulty = new FormControl();

  constructor(workUnit: WorkUnit) {
    this.startWorkTime.setValue(workUnit.startWorkTime);
    this.endWorkTime.setValue(workUnit.endWorkTime);
    this.typeWork.setValue(workUnit.typeWork);
    this.numOrder.setValue(workUnit.numOrder);
    this.nameOrder.setValue(workUnit.nameOrder);
    this.groupDifficulty.setValue(workUnit.groupDifficulty);
  }
}
