import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule} from '@ngrx/store';


import { AppComponent } from './app.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {RouterStoreModule} from '@ngrx/router-store';
import {RouterModule} from '@angular/router';

import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import { ThreadsService} from './services/threads.service';
import {LoadThreadsEffectService} from './store/effects/load-threads-effect.service';
import {INITIAL_APPLICATION_STATE} from './store/application-state';
import {WriteNewMessageEffectService} from './store/effects/write-new-message-effect.service';
import {appReducer} from './store/reducers/rootReducer';
import {ServerNotificationsEffectService} from './store/effects/server-notifications-effect.service';
import {MarkMessagesAsReadEffectService} from './store/effects/mark-messages-as-read-effect.service';
import { MessagesComponent } from './messages/messages.component';
import {routes} from './routes';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { BasichighlightDirective } from './shared/directives/basichighlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent,
    MessagesComponent,
    HomeComponent,
    AboutComponent,
    ChatMessageComponent,
    BasichighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {useHash: true}),
    StoreModule.provideStore(appReducer, INITIAL_APPLICATION_STATE),
    RouterStoreModule.connectRouter(),
    EffectsModule.run(LoadThreadsEffectService),
    EffectsModule.run(WriteNewMessageEffectService),
    EffectsModule.run(ServerNotificationsEffectService),
    EffectsModule.run(MarkMessagesAsReadEffectService),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
