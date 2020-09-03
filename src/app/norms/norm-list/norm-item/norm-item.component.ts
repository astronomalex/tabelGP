import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {Norma} from '../../../report/norma.model';

@Component({
  selector: 'app-norm-item',
  templateUrl: './norm-item.component.html',
  styleUrls: ['./norm-item.component.css']
})
export class NormItemComponent implements OnInit {
  @Input() norma: Norma;
  @Input() index: number;
  @Input() machine: string;
  routerLink: string;

  constructor(
  ) { }

  ngOnInit() {
    this.routerLink = this.machine + '/' + this.norma.grpDiff;
  }

}
