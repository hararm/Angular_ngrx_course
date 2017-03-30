import {Action} from '@ngrx/store';
import {StoreData} from '../store-data';
import * as _ from 'lodash';

const uuid = require('uuid/v4');

import {
  NEW_MESSAGES_RECEIVED_ACTION,
  NewMessagesReceivedAction,
  SEND_NEW_MESSAGE_ACTION, SendNewMessageAction, USER_THREADS_LOADED_ACTION,
  UserThreadsLoadedAction
} from '../actions';
import {Message} from '../../../../shared/model/message';



export function storeData(state: StoreData, action: Action): StoreData {
  switch (action.type) {
    case USER_THREADS_LOADED_ACTION:
      return handleLoadUserThreadsAction( <any>action );
    case SEND_NEW_MESSAGE_ACTION:
      return handleSendNewMessageAction(state, <any>action);
    case NEW_MESSAGES_RECEIVED_ACTION:
      return handleNewMessagesReceivedAction(state, <any>action);
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

function handleSendNewMessageAction(state: StoreData, action: SendNewMessageAction) {
  const newStoreState = _.cloneDeep(state);

  const currentThread = newStoreState.threads[action.payload.threadId];

  const newMessage: Message = {
    text: action.payload.text,
    threadId: action.payload.threadId,
    timestamp: new Date().getTime(),
    participantId: action.payload.participantId,
    id: uuid()
  };
  currentThread.messageIds.push(newMessage.id);
  newStoreState.messages[newMessage.id] = newMessage;

  return newStoreState;
}

function handleNewMessagesReceivedAction(state: StoreData, action: NewMessagesReceivedAction) {
  const newStoreState = _.cloneDeep(state);
  const newMessages = action.payload.unreadMessages;
  const currentThreadId = action.payload.currentThreadId;
  const currentUserId = action.payload.currentUserId;

  newMessages.forEach(message => {
    newStoreState.messages[message.id] = message;
    newStoreState.threads[message.threadId] = _.clone(newStoreState.threads[message.threadId]);

    const messageThread = newStoreState.threads[message.threadId];

    messageThread.messageIds = _.clone(messageThread.messageIds);
    messageThread.messageIds.push(message.id);

    if (message.threadId !== currentThreadId) {
      messageThread.participants = _.clone(newStoreState.threads[message.threadId].participants);
      messageThread.participants[currentUserId] += 1;
    }
  });



  return newStoreState;
}
