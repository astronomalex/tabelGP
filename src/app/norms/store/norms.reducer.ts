import {Norma} from '../../report/norma.model';
import * as NormsAction from '../store/norms.action';

export interface State {
  norms: { [machine: string]: Norma[] };
  selectedNormId: number;
}

const initialState: State = {
  norms: {
    'GIETZ-1': [{grpDiff: '5', norma: 144000}, {grpDiff: '4', norma: 160000}],
    'Media-100': [{grpDiff: '11', norma: 202850}, {grpDiff: '15', norma: 263850}]
  },
  selectedNormId: null
};

export function normsReducer(state: State = initialState, actions: NormsAction.NormsAction) {
  switch (actions.type) {

    case NormsAction.ADD_NORM:
      return {
        ...state,
        allNorms: [state.norms, actions.payload]
      };

    case NormsAction.SET_NORMS:
      return {
        ...state,
        allNorms: actions.payload
      };

    case NormsAction.UPDATE_NORM:
      const updAllNorms = state.norms;
      const newNorm = new Norma(actions.payload.norm.grpDiff, actions.payload.norm.norma);
      updAllNorms[actions.payload.machine].push(newNorm);
      return {
        ...state,
        allNorms: updAllNorms
      };

    case NormsAction.DELETE_NORM:
      const allNorms = state.norms;
      allNorms[actions.payload.machine].filter((value, index) => {
        return value.grpDiff !== actions.payload.groupDiff;
      });
      return {
        ...state,
        allNorms
      };

    case NormsAction.SELECT_NORM:
      return {
        ...state,
        selectedNormId: actions.payload
      };
  }
}
