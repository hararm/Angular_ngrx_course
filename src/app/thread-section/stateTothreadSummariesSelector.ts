import {Thread} from '../../../shared/model/thread';
import {ApplicationState} from '../store/application-state';
import {ThreadSummaryVM} from './thread-summary.vm';

import * as _ from 'lodash';

export function stateToThreadSummariesSelector(state: ApplicationState): ThreadSummaryVM[] {
  const threads = _.values<Thread>(state.storeData.threads);
  return threads.map(_.partial(mapThreadToThreadSummary, state));
}

export function mapThreadToThreadSummary(state: ApplicationState, thread: Thread): ThreadSummaryVM {
  const names = _.keys(thread.participants).map(
    participantId => state.storeData.participants[participantId].name);
  const lastMessageId = _.last(thread.messageIds);
  const lastMessage = state.storeData.messages[lastMessageId];
  return {
    id: thread.id,
    participantNames: _.join(names, ','),
    lastMessageText: lastMessage.text,
    timestamp: lastMessage.timestamp,
    read: thread.id === state.uiState.currentThreadId || thread.participants[state.uiState.userId] === 0
  };
}

