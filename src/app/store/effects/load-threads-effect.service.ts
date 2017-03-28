import { Injectable } from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {ThreadsService} from '../../services/threads.service';
import {LOAD_USER_THREADS_ACTION, LoadUserThreadsAction, SELECT_USER_ACTION, UserThreadsLoadedAction} from '../actions';

@Injectable()
export class LoadThreadsEffectService {
  constructor(private actions$: Actions, private threadsService: ThreadsService) { }

  @Effect() userThreads$: Observable<Action> = this.actions$
    .ofType(LOAD_USER_THREADS_ACTION)
    .debug('Action received')
    .switchMap(action => this.threadsService.loadUserThreads(action.payload))
    .debug('Data received via HTTP request')
    .map(allUserData => new UserThreadsLoadedAction(allUserData));

  @Effect() newUserSelected$: Observable<Action> = this.actions$
    .ofType(SELECT_USER_ACTION)
    .debug('New user selected')
    .map(action => new LoadUserThreadsAction(action.payload));
}
