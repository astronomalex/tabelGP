import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SmenListService} from '../tabel/smen-list/smen-list.service';
import {Smena} from '../tabel/smen-list/smena.model';
import {map, tap} from 'rxjs/operators';
import {WorkerListService} from '../workers/worker-list/worker-list.service';
import {WorkerData} from '../workers/worker-list/worker-data.model';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private smenListService: SmenListService,
    private workerListService: WorkerListService,
    private authService: AuthService
  ) {}

  storeSmens() {
    if (this.authService.emailUser) {
      console.log(this.authService.emailUser);
      const url: string = 'https://ng-tabelgp.firebaseio.com/' + this.authService.emailUser + '_smens.json';
      const smens = this.smenListService.getSmens();
      if (smens.length > 0) {
        this.http.put(url, smens)
        // this.http.put('https://ng-tabelgp.firebaseio.com/smens.json', smens)
          .subscribe(response => {
            console.log(response);
          });
      }
    }
  }

  fetchSmens() {
    if (this.authService.emailUser) {
      const url: string = 'https://ng-tabelgp.firebaseio.com/' + this.authService.emailUser + '_smens.json';
      return this.http
        .get<Smena[]>(
          url
        ).pipe(
          map(smens => {
            return smens.map(smena => {
              return {
                ...smena,
                workersTime: smena.workersTime ? smena.workersTime : []
              };
            });
          }),
          tap(smens => {
            this.smenListService.setSmens(smens);
            console.log(smens);
          })
        );
    } else {
      return null;
    }
  }

  storeWorkers() {
    const workers = this.workerListService.getWorkers();
    if (workers.length > 0) {
      this.http.put('https://ng-tabelgp.firebaseio.com/workers.json', workers)
        .subscribe(response => {
          console.log(response);
        });
    }
  }

  fetchWorkers() {
    return this.http
      .get<WorkerData[]>(
        'https://ng-tabelgp.firebaseio.com/workers.json'
      ).pipe(
        map(workers => {
          return workers.map(wrk => {
            return {
              ...wrk
            };
          });
        }),
        tap(workers => {
          this.workerListService.setWorkers(workers);
          console.log(workers);
        })
      );
  }
}
