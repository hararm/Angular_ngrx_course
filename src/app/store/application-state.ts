import {INITIAL_UI_STATE, UiState} from "./ui-state";
import {INITIAL_STORE_DATA, StoreData} from "./store-data";

export interface ApplicationState{
  uiState: UiState;
  storeDate: StoreData;
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  uiState: INITIAL_UI_STATE,
  storeDate: INITIAL_STORE_DATA
};
