import {combineReducers} from '@ngrx/store';
import {uiState} from './uiStateReducer';
import {storeData} from './uiStoreDataReducer';
import {INITIAL_APPLICATION_STATE} from '../application-state';
import {compose} from '@ngrx/core/compose';
import {storeFreeze} from 'ngrx-store-freeze';


const metaReducers = [storeFreeze, combineReducers];

const reducers = compose(...metaReducers)({
  uiState,
  storeData
});

export function appReducer(state: any = INITIAL_APPLICATION_STATE, action: any) {
  return reducers(state, action);
}

