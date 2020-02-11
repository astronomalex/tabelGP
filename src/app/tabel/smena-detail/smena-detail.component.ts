import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Smena} from '../smen-list/smena.model';
import {ActivatedRoute, Params} from '@angular/router';
import {SmenListService} from '../smen-list/smen-list.service';
import {WorkerData} from '../../workers/worker-list/worker-data.model';
import {WorkerListService} from '../../workers/worker-list/worker-list.service';

@Component({
  selector: 'app-smena-detail',
  templateUrl: './smena-detail.component.html',
  styleUrls: ['./smena-detail.component.css']
})
export class SmenaDetailComponent implements OnInit, OnDestroy, AfterContentInit{
  smena: Smena;
  id: number;
  workersTabelNums: string[];
  workers: WorkerData[] = [];

  constructor(
    private route: ActivatedRoute,
    private smenListService: SmenListService,
    private workerListService: WorkerListService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    );
    this.smena = this.smenListService.getSmenById(this.id);
  }

  ngAfterContentInit(): void {
    for (let workerTime of this.smena.workersTime) {
      // this.workersTabelNums.push(workerTime.tbNum);
      this.workers.push(this.workerListService.getWorkerByTN(workerTime.tbNum));
    }
  }

  ngOnDestroy(): void {

  }


}
