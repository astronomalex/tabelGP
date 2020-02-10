import {Component, OnDestroy, OnInit} from '@angular/core';
import {Smena} from '../smen-list/smena.model';
import {ActivatedRoute, Params} from '@angular/router';
import {SmenListService} from '../smen-list/smen-list.service';

@Component({
  selector: 'app-smena-detail',
  templateUrl: './smena-detail.component.html',
  styleUrls: ['./smena-detail.component.css']
})
export class SmenaDetailComponent implements OnInit, OnDestroy{
  smena: Smena;
  id: number;

  constructor(private route: ActivatedRoute, private smenListService: SmenListService) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.smena = this.smenListService.getSmenById(this.id);
      }
    );
  }

  ngOnDestroy(): void {

  }


}
