import {ActionReducer, combineReducers} from '@ngrx/store';
import {uiState} from './uiStateReducer';
import {storeData} from './uiStoreDataReducer';
import {ApplicationState, INITIAL_APPLICATION_STATE} from '../application-state';

export const reducers = combineReducers({
  uiState,
  storeData
});

export function appReducer(state: any = INITIAL_APPLICATION_STATE, action: any) {
  return reducers(state, action);
}

