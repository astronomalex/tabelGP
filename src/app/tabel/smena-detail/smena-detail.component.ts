import {AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import {Smena} from '../smen-list/smena.model';
import {SmenListService} from '../smen-list/smen-list.service';
import {WorkerData} from '../../workers/worker-list/worker-data.model';
import {WorkerListService} from '../../workers/worker-list/worker-list.service';
import {WorkerTime} from '../../workers/worker-list/workers-time.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-smena-detail',
  templateUrl: './smena-detail.component.html',
  styleUrls: ['./smena-detail.component.css']
})
export class SmenaDetailComponent implements OnInit, OnDestroy {
  smena: Smena;
  id: number;
  workersTabelNums: string[];
  workers: WorkerData[] = [];
  wrkTime: WorkerTime;

  constructor(
    private route: ActivatedRoute,
    private smenListService: SmenListService,
    private workerListService: WorkerListService,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(
        params => {
          return +params.id;
        }),
      switchMap(id => {
        this.id = id;
        return this.store.select('tabel');
      }),
      map(tabelState => {
        return tabelState.smens.find(
          (smena, index) => {
            return index === this.id;
          });
        }
      ),
      withLatestFrom(this.store.select('workers')),
      map(([smena, workersState]) => {
        return ([smena, workersState.workers]);
      })
    ).subscribe(([smena, workers]) => {
      this.smena = smena;
      this.workers = workers;
      for (const workerTime of this.smena.workersTime) {
        console.log(workerTime);
        // this.workersTabelNums.push(workerTime.tbNum);
        this.workers.push(
          this.store.select('workers')
      })
        );
        this.workers.push(this.workerListService.getWorkerByTN(workerTime.tbNum));
    });
    // this.smena = this.smenListService.getSmenById(this.id);

          //
          // }
  }

  ngOnDestroy(): void {

  }

  onEditSmena() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteSmena() {
    this.smenListService.deleteSmena(this.id);
    this.router.navigate(['smen-list']);
  }


}
