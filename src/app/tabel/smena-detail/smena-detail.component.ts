import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

import {Smena} from '../smen-list/smena.model';
import {WorkerData} from '../../workers/worker-list/worker-data.model';
import {WorkerTime} from '../../workers/worker-list/workers-time.model';
import * as fromApp from '../../store/app.reducer';
import * as TabelActions from '../store/tabel.actions';
import {getSelectedSmena, getSelectedSmenaWorkersData} from '../selectors/app.selector';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-smena-detail',
  templateUrl: './smena-detail.component.html',
  styleUrls: ['./smena-detail.component.css']
})
export class SmenaDetailComponent implements OnDestroy {
  smena: Smena;
  id: number;
  workersTabelNums: string[];
  workers: WorkerData[] = [];
  wrkTime: WorkerTime;
  public selectedWorkers: WorkerData[];
  public selectedSmena$ = this.store.pipe(select(getSelectedSmena));
  private ngUnsubscribe$ = new Subject();
  public selectedWorkers$ = this.store.pipe(select(getSelectedSmenaWorkersData)).pipe(
    takeUntil(this.ngUnsubscribe$)
  ).subscribe(
    item => this.selectedWorkers = item
  );

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {
  }

  // ngOnInit(): void {
  //   this.route.params.pipe(
  //     map(
  //       params => {
  //         return +params.id;
  //       }),
  //     switchMap(id => {
  //       this.id = id;
  //       return this.store.select('tabel');
  //     }),
  //     map(tabelState => {
  //       return tabelState.smens.find(
  //         (smena, index) => {
  //           return index === this.id;
  //         });
  //       }
  //     )
  //   ).subscribe(smena => {
  //     this.smena = smena;
  //     for (const workerTime of this.smena.workersTime) {
  //           console.log(workerTime);
  //           this.workersTabelNums.push(workerTime.tbNum);
  //         }
  //   });
  //     // map((smena) => {
  //     //   this.smena = smena;
  //     //   for (const workerTime of this.smena.workersTime) {
  //     //     console.log(workerTime);
  //     //     // this.workersTabelNums.push(workerTime.tbNum);
  //     //     return this.store.select('workers');
  //     //   }
  //     //   ),
  //
  //
  //
  //
  //
  //   //         map(wokersState => {
  //   //           this.workers = wokersState.workers;
  //   //         })
  //   //       );
  //   //     });
  //   //   })
  //   // ).subscribe(
  //   // // this.workers.push(this.workerListService.getWorkerByTN(workerTime.tbNum));
  //   //     // this.smena = this.smenListService.getSmenById(this.id);
  //   //
  //   //       //
  //   //       // }
  // }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onEditSmena() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteSmena() {
    // this.smenListService.deleteSmena(this.id);
    this.store.dispatch(new TabelActions.DeleteSmena(this.id));
    this.router.navigate(['smen-list']);
  }


}
