import {UiState} from '../ui-state';
import {Action} from '@ngrx/store';
import {SELECT_USER_ACTION, THREAD_SELECTED_ACTION} from '../actions';

export function uiState(state: UiState, action: Action): UiState {

  switch (action.type) {
    case THREAD_SELECTED_ACTION:
      const newState = Object.assign({}, state);
      newState.currentThreadId = action.payload;
      return newState;
    case SELECT_USER_ACTION:
      return handleSelectUserAction(state, action);
    default:
      return state;
  }
}

function handleSelectUserAction(state: UiState, action: Action) {
  const newUiState = Object.assign({}, state);
  newUiState.userId = action.payload;
  newUiState.currentThreadId = undefined;
  return newUiState;
}
