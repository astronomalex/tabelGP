import {Component, Input, OnInit} from '@angular/core';
import {Smena} from '../smena.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import {SelectSmena} from '../../store/tabel.actions';


@Component({
  selector: 'app-smena-item',
  templateUrl: './smena-item.component.html',
  styleUrls: ['./smena-item.component.css']
})
export class SmenaItemComponent implements OnInit {
  @Input() smena: Smena;
  @Input() index: number;

  constructor(public store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
  }

  public onItemClick(payload: number) {
    this.store.dispatch(new SelectSmena(payload));
  }

}
