import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../app.reducer';
import * as TabelState from '../../tabel/store/tabel.reducer';
import * as WorkerState from '../../workers/store/workers.reducer';
import * as ReportState from '../../report/store/report.reducer';
import * as NormsState from '../../norms/store/norms.reducer';
import {WorkerTime} from '../../workers/worker-list/workers-time.model';


export const TabelFeature = createFeatureSelector<AppState, TabelState.State>('tabel');
export const WorkerDataFeature = createFeatureSelector<AppState, WorkerState.State>('workers');
export const ReportFeature = createFeatureSelector<AppState, ReportState.State>('reports');
export const NormFeature = createFeatureSelector<AppState, NormsState.State>('norms');

export const getSelectedSmenaId = createSelector(TabelFeature, (tabelState: TabelState.State) => tabelState.selectedSmenaId);
export const getSelectedSmena =
  createSelector(TabelFeature, (tabelState: TabelState.State) => tabelState.smens[tabelState.selectedSmenaId]);
export const getSelectedSmenaWorkersTime = createSelector(
  TabelFeature, (tabelState: TabelState.State) => tabelState.smens[tabelState.selectedSmenaId].workersTime
);
export const getSmensFromState = createSelector(TabelFeature, tabelState => tabelState.smens);
export const getEditedSmena = createSelector(TabelFeature, tabelState => tabelState.editedSmena);
export const getSelectedSmenaWorkersData = createSelector(
  WorkerDataFeature, getSelectedSmenaWorkersTime, (workersState: WorkerState.State, workerTimes: WorkerTime[]) => {
    return workersState.workers.filter(item => workerTimes.find(workerTime => workerTime.tbNum === item.tabelNum) !== undefined);
  });
export const getWorkers = createSelector(WorkerDataFeature, (workersState: WorkerState.State) => workersState.workers);
export const getMachineList = createSelector(TabelFeature, state => state.machineList);

export const getReportsFromState = createSelector(ReportFeature, reportState => reportState.reports);

export const getTypesOfWorkFromState = createSelector(ReportFeature, reportsState => reportsState.typesOfWork);
export const getNormsFromState = createSelector(NormFeature, normsState => normsState.allNorms ? normsState.allNorms : {});
export const getSelectedReport = createSelector(ReportFeature, reportState => {
  if (reportState.selectedReportId !== null) {
    return reportState.reports[reportState.selectedReportId];
  } else {
    return null;
  }
});
export const getSelectedReportWorkers = createSelector(getSelectedReport, report => {
  return report.workerListReport ? report.workerListReport : [];
});
export const getSelectedReportWorkerDatas = createSelector(
  WorkerDataFeature, getSelectedReportWorkers,
  (workersState: WorkerState.State, workers) => {
    return workersState.workers.filter(item => workers.find((tabNum) => tabNum.tbNum === item.tabelNum) !== undefined);
  }
);
export const getSelectedMachine = createSelector(ReportFeature, reportState => reportState.selectedMachine);
export const getNormsByMachine = createSelector(getNormsFromState, getSelectedMachine, (norms, selectedMachine) => norms[selectedMachine]);
export const getSelectedNormGroupDiff = createSelector(NormFeature, normsState => normsState.selectedNormGrDiff);
export const getSelectedNorma = createSelector(getNormsByMachine, getSelectedNormGroupDiff, (norms, groupDiff) => {
  if (norms) {
    return norms.find(
      norma =>
        norma.grpDiff === groupDiff
    );
  } else {
    return {grpDiff: '', norma: 0};
  }
});
export const getEditedReport = createSelector(ReportFeature, reportsState => reportsState.editedReport);
export const getEditedWorkUnits = createSelector(getEditedReport, editedReport => editedReport.workListReport);
