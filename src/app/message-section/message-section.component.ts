import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import { Component, OnInit } from '@angular/core';

import {ApplicationState} from '../store/application-state';
import {MessageVM} from './message.vm';
import {messageparticipantNamesSelector} from './messageParticipantNamesSelector';
import {messagesSelector} from './messagesSelector';
import {SendNewMessageAction} from '../store/actions';
import {UiState} from '../store/ui-state';

@Component({
  selector: 'message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent {

  participantNames$: Observable<string>;
  messages$: Observable<MessageVM[]>;
  uiState: UiState;

  constructor(private store: Store<ApplicationState>) {
    this.participantNames$ = store.select(messageparticipantNamesSelector);
    this.messages$ = store.select(messagesSelector);
    store.subscribe(state => this.uiState = Object.assign({}, state.uiState));
  }

  onNewMessage(input: any) {
    this.store.dispatch(new SendNewMessageAction({
      text: input.value,
      threadId: this.uiState.currentThreadId, participantId: this.uiState.userId
    }));
    input.value = '';
  }

}
