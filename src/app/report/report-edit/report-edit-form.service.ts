import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';

@Injectable()
export class ReportEditFormService {
  private reportForm: BehaviorSubject<FormGroup | undefined> =
    new BehaviorSubject(this.fb.group(new ))

  constructor(private fb: FormBuilder) {}
}
