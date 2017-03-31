import {ApplicationState} from '../store/application-state';
import {MessageVM} from './message.vm';
import { createSelector } from 'reselect';
import * as _ from 'lodash';

import {Message} from '../../../shared/model/message';
import {Participant} from '../../../shared/model/participant';

export const messagesSelector = createSelector(getParticipants, getMessagesForCurrentThread,
  mapMessagesToMessageViewModel);


function getMessagesForCurrentThread(state: ApplicationState): Message[] {
  const currentThread = state.storeData.threads[state.uiState.currentThreadId];
  return currentThread ? currentThread.messageIds.map(messageId => state.storeData.messages[messageId]) : [];
}

function getParticipants(state: ApplicationState) {
  return state.storeData.participants;
}

const mapMessageToMessageVM = _.memoize((participantName: string, message: Message): MessageVM => {
  return {
    id: message.id,
    text: message.text,
    timestamp: message.timestamp,
    participantName: participantName
  };
}, (participantName: string, message: Message) => message.id + participantName );

function mapMessagesToMessageViewModel(participants: {[key: number]: Participant}, messages: Message[]) {
  return messages.map(message => {
    const participantName = participants[message.participantId].name;
    return mapMessageToMessageVM(participantName, message);
  });
}

