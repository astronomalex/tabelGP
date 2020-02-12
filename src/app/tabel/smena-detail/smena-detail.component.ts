import {AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Smena} from '../smen-list/smena.model';
import {ActivatedRoute, Params} from '@angular/router';
import {SmenListService} from '../smen-list/smen-list.service';
import {WorkerData} from '../../workers/worker-list/worker-data.model';
import {WorkerListService} from '../../workers/worker-list/worker-list.service';
import {WorkerTime} from '../../workers/worker-list/workers-time.model';

@Component({
  selector: 'app-smena-detail',
  templateUrl: './smena-detail.component.html',
  styleUrls: ['./smena-detail.component.css']
})
export class SmenaDetailComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {
  smena: Smena;
  id: number;
  workersTabelNums: string[];
  workers: WorkerData[] = [];
  wrkTime: WorkerTime;

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
        this.workers = [];
        this.smena = this.smenListService.getSmenById(this.id);
        for (let workerTime of this.smena.workersTime) {
          console.log(workerTime);
          // this.workersTabelNums.push(workerTime.tbNum);
          this.workers.push(this.workerListService.getWorkerByTN(workerTime.tbNum));

        }
      }
    );
  }

  ngAfterContentInit(): void {

  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {

  }


}
