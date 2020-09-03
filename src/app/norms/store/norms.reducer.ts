import {Norma} from '../../report/norma.model';
import * as NormsAction from '../store/norms.action';

export interface State {
  allNorms: { [machine: string]: Norma[] };
  selectedNormGrDiff: string;
  selectedMachine: string;
}

const initialState: State = {
  allNorms: {
    // 'GIETZ-1': [{grpDiff: '5', norma: 144000}, {grpDiff: '4', norma: 160000}],
    // 'Media-100': [{grpDiff: '11', norma: 202850}, {grpDiff: '15', norma: 263850}]
  },
  selectedNormGrDiff: '',
  selectedMachine: ''
};

export function normsReducer(state: State = initialState, actions: NormsAction.NormsAction) {
  switch (actions.type) {

    case NormsAction.ADD_NORM:
      const updatedNomrs = state.allNorms;
      if (!updatedNomrs[actions.payload.machine].findIndex((value) => actions.payload.norma.grpDiff === value.grpDiff)) {
        updatedNomrs[actions.payload.machine].push(actions.payload.norma);
      }
      return {
        ...state,
        allNorms: updatedNomrs
      };

    case NormsAction.SET_NORMS:
      return {
        ...state,
        allNorms: actions.payload
      };

    case NormsAction.UPDATE_NORM:
      const updAllNorms = state.allNorms;
      const newNorm = new Norma(actions.payload.norm.grpDiff, actions.payload.norm.norma);
      updAllNorms[actions.payload.machine].push(newNorm);
      return {
        ...state,
        allNorms: updAllNorms
      };

    case NormsAction.DELETE_NORM:
      const allNorms = state.allNorms;
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
        selectedMachine: actions.payload.machine,
        selectedNormGrDiff: actions.payload.groupDiff
      };
    default:
      return state;
  }
}
