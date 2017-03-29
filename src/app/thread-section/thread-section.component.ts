import {Component, OnInit} from '@angular/core';
import {ThreadsService} from '../services/threads.service';
import {ApplicationState} from '../store/application-state';
import {Store} from '@ngrx/store';
import {LoadUserThreadsAction, ThreadSelectedAction, UserThreadsLoadedAction} from '../store/actions';
import {Observable} from 'rxjs';


import {ThreadSummaryVM} from './thread-summary.vm';
import {userNameSelector} from './userNameSelector';
import {mapStateToUnreadmessagesCounter} from './mapStateToUnreadMessagesCounter';
import {stateToThreadSummariesSelector} from 'app/thread-section/stateTothreadSummariesSelector';


@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;
  currentSelectedThreadId$: Observable<number>;

  constructor(private store: Store<ApplicationState>) {
    this.userName$ = store.select(userNameSelector);
    this.unreadMessagesCounter$ = store.map(mapStateToUnreadmessagesCounter);
    this.threadSummaries$ = store.select(stateToThreadSummariesSelector);
    this.currentSelectedThreadId$ = store.select(state => state.uiState.currentThreadId);
  }

  onThreadSelected(selectedThreadId: number) {
    this.store.dispatch(new ThreadSelectedAction(selectedThreadId));
  }

}
