import {Component, Input, OnInit} from '@angular/core';
import {Smena} from '../smena.model';
import {SmenListService} from '../smen-list.service';

@Component({
  selector: 'app-smena-item',
  templateUrl: './smena-item.component.html',
  styleUrls: ['./smena-item.component.css']
})
export class SmenaItemComponent implements OnInit {
  @Input()smena: Smena;
  @Input()index: number;

  constructor(smenListService: SmenListService) {
  }

  ngOnInit(): void {
  }

  onGetSmen(dateSmen: string) {

  }
}
