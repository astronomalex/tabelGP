import {FormControl, Validators} from '@angular/forms';
import {WorkUnit} from '../work-unit.model';
import {createPerformWatchHost} from '@angular/compiler-cli/src/perform_watch';

export class WorkUnitFormModel {
  startWorkTime = new FormControl();
  endWorkTime = new FormControl();
  typeWork = new FormControl();
  numOrder = new FormControl();
  nameOrder = new FormControl();
  groupDifficulty = new FormControl();
  amountDonePieces = new FormControl();

  constructor(workUnit: WorkUnit) {
    this.startWorkTime.setValue(workUnit.startWorkTime);
    this.startWorkTime.setValidators([Validators.required]);

    this.endWorkTime.setValue(workUnit.endWorkTime);
    this.endWorkTime.setValidators([Validators.required]);

    this.typeWork.setValue(workUnit.typeWork);
    this.typeWork.setValidators([Validators.required]);

    this.numOrder.setValue(workUnit.numOrder);
    // this.numOrder.setValidators([Validators.required]);

    this.nameOrder.setValue(workUnit.nameOrder);
    // this.nameOrder.setValidators([Validators.required]);

    this.groupDifficulty.setValue(workUnit.groupDifficulty);
    // this.groupDifficulty.setValidators([Validators.required]);
    this.amountDonePieces.setValue(workUnit.amountDonePieces);
    // this.amountDonePieces.setValidators([Validators.required]);
  }
}
