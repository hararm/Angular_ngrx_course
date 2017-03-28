import {Action} from '@ngrx/store';
import {StoreData} from '../store-data';
import * as _ from 'lodash';

const uuid = require('uuid/v4');

import {SEND_NEW_MESSAGE_ACTION, USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction} from '../actions';
import {Message} from '../../../../shared/model/message';



export function storeData(state: StoreData, action: Action): StoreData {
  switch (action.type) {
    case USER_THREADS_LOADED_ACTION:
      return handleLoadUserThreadsAction( action );
    case SEND_NEW_MESSAGE_ACTION:
      return handleSendNewMessageAction(state, action);
    default:
      return state;
  }
}

export function handleLoadUserThreadsAction(action: UserThreadsLoadedAction): StoreData {
  return {
    participants: _.keyBy(action.payload.participants, 'id' ),
    messages: _.keyBy(action.payload.messages, 'id' ),
    threads:  _.keyBy(action.payload.threads, 'id' )
  };
}

function handleSendNewMessageAction(state: StoreData, action: Action) {
  const newStoreState = _.cloneDeep(state);

  const currentThread = newStoreState.threads[action.payload.threadId];

  const newMessage: Message = {
    text: action.payload.text,
    threadId: action.payload.threadId,
    timestamp: new Date().getTime(),
    participantId: action.payload.participantId,
    id: uuid()
  }
  currentThread.messageIds.push(newMessage.id);
  newStoreState.messages[newMessage.id] = newMessage;

  return newStoreState;
}
