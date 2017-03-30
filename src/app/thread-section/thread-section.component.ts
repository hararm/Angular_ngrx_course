import {Component} from '@angular/core';
import {ApplicationState} from '../store/application-state';
import {Store} from '@ngrx/store';
import { ThreadSelectedAction } from '../store/actions';
import {Observable} from 'rxjs';
import * as _ from 'lodash';


import {ThreadSummaryVM} from './thread-summary.vm';
import {userNameSelector} from './userNameSelector';
import {mapStateToUnreadmessagesCounter} from './mapStateToUnreadMessagesCounter';
import {stateToThreadSummariesSelector} from 'app/thread-section/stateTothreadSummariesSelector';
import {UiState} from '../store/ui-state';


@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;

  uiState: UiState;

  constructor(private store: Store<ApplicationState>) {
    this.userName$ = store.select(userNameSelector);
    this.unreadMessagesCounter$ = store.map(mapStateToUnreadmessagesCounter);
    this.threadSummaries$ = store.select(stateToThreadSummariesSelector);
    store.select(state => state.uiState).subscribe(uiState => this.uiState = _.cloneDeep(uiState));
  }

  onThreadSelected(selectedThreadId: number) {
    this.store.dispatch(new ThreadSelectedAction({ selectedThreadId, currentUserId: this.uiState.userId }));
  }

}
