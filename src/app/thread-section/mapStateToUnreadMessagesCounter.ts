import {Thread} from '../../../shared/model/thread';
import {ApplicationState} from '../store/application-state';

import * as _ from 'lodash';


export function mapStateToUnreadmessagesCounter(state: ApplicationState): number {

  const currentUserId = state.uiState.userId;
  return _.values<Thread>(state.storeData.threads)
    .reduce((acc, thread ) => acc + (thread.participants[currentUserId] || 0), 0);
}

