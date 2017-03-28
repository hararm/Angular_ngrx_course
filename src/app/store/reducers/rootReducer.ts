import { combineReducers } from '@ngrx/store';
import {uiState} from './uiStateReducer';
import {storeData} from './uiStoreDataReducer';

export function rootReducer() {
  return  combineReducers({uiState, storeData});
}
