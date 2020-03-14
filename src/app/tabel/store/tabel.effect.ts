import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';

import * as fromApp from '../store/tabel.reducer';
import * as TabelActions from './tabel.actions';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Smena} from '../smen-list/smena.model';


@Injectable()
export class TabelEffect {
  @Effect()
  fetchSmens = this.actions$.pipe(
    ofType(TabelActions.FETCH_SMENS),
    switchMap(() => {
      const url: string = 'https://ng-tabelgp.firebaseio.com/'
        + this.store.select('auth').locId + '_smens.json';
      return this.http.get<Smena[]>(url).pipe(
        map(smens => {
          return smens.map(smena => {
            return {
              ...smena,
              workersTime: smena.workersTime ? smena.workersTime : []
            };
          });
        }),
        tap(smens => {
          this.store.dispatch(new TabelActions.AddSmens(smens));
          console.log(smens);
        })
      );
      }
    )
    // switchMap(() => {
    //   return {
    //     if (this.store.select('Auth').pipe(
    //     )) {
    //     const url: string = 'https://ng-tabelgp.firebaseio.com/' + this.authService.locId + '_smens.json';
    //     return this.http
    //       .get<Smena[]>(
    //         url
    //       ).pipe(
    //         map(smens => {
    //           return smens.map(smena => {
    //             return {
    //               ...smena,
    //               workersTime: smena.workersTime ? smena.workersTime : []
    //             };
    //           });
    //         }),
    //         tap(smens => {
    //           this.smenListService.setSmens(smens);
    //           this.store.dispatch(new TabelActions.AddSmens(smens));
    //           console.log(smens);
    //         })
    //       );
    //     )
    //   } else {
    //     return null;
    //   }
    //   }
   // })
  );

  @Effect({dispatch: false})
  storeSmens = this.actions$.pipe(
    ofType(TabelActions.STORE_SMENS),
    withLatestFrom(this.store.select('tabel')),
    withLatestFrom(this.store.select('auth')),
    switchMap(([actionData, tabelState]) => {
      const url: string = 'https://ng-tabelgp.firebaseio.com/' + this.store.select('auth').locId + '_smens.json';
      return this.http.put(url, this.store.select('tabel').smens);
    })
  );
  // storeSmens() {
  //
  //   if (this.locId) {}
  //   if (this.authService.locId) {
  //     console.log(this.authService.locId);
  //     const url: string = 'https://ng-tabelgp.firebaseio.com/' + this.authService.locId + '_smens.json';
  //     const smens = this.smenListService.getSmens();
  //     if (smens.length > 0) {
  //       this.http.put(url, smens)
  //         // this.http.put('https://ng-tabelgp.firebaseio.com/smens.json', smens)
  //         .subscribe(response => {
  //           console.log(response);
  //         });
  //     }
  //   }
  // }

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.State>
  ) {}
}
