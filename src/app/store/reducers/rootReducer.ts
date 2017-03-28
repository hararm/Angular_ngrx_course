import { combineReducers } from '@ngrx/store';
import {uiState} from './uiStateReducer';
import {storeData} from './uiStoreDataReducer';

export const rootReducer = combineReducers({
  uiState,
  storeData
});

