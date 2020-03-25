import {createFeatureSelector, createSelector, select} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {State} from '../store/tabel.reducer';
import {WorkerTime} from '../../workers/worker-list/workers-time.model';


export const TabelFeature = createFeatureSelector<AppState, State>('tabel');
export const WorkerDataFeature = createFeatureSelector<AppState, State>('workers');

export const getSelectedSmenaId = createSelector(TabelFeature, (tabelState: State) => tabelState.selectedSmenaId);
export const getSelectedSmena = createSelector(TabelFeature, (tabelState: State) => tabelState.smens[tabelState.selectedSmenaId]);
export const getSelectedSmenaWorkersTime = createSelector(
  TabelFeature, (tabelState: State) => tabelState.smens[tabelState.selectedSmenaId].workersTime
);
export const getSmensFromState = createSelector(TabelFeature, tabelState => tabelState.smens);
export const getEditedSmena = createSelector(TabelFeature, tabelState => tabelState.editedSmena);
export const getSelectedSmenaWorkersData = createSelector(
  WorkerDataFeature, getSelectedSmenaWorkersTime, (workersState: State, workerTimes: WorkerTime[]) => {
  return workersState.workers.filter(item => workerTimes.find(workerTime => workerTime.tbNum === item.tabelNum) !== undefined);
});
export const getWorkers = createSelector(WorkerDataFeature, (workersState: State) => workersState.workers);
// export const getEditedSmena = createSelector(getWorkers, (workers) => workers.)
