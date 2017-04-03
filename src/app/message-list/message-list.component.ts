import {
  ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChanges,
  ViewChild
} from '@angular/core';
import {MessageVM} from '../message-section/message.vm';

import * as _ from 'lodash';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListComponent implements OnChanges {

  @Input()
  messages: MessageVM[];

  @ViewChild('list')
  list: ElementRef;

  filteredText: string;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['messages'].previousValue !== undefined && changes['messages'].currentValue !== undefined) {
      const previousMessages = changes['messages'].previousValue;
      const newMessages = changes['messages'].currentValue;

      if (newMessages.length > previousMessages.length) {
        setTimeout(() => {
          this.scrollLastMessageIntoView();
        });
      }
    }
  }

  scrollLastMessageIntoView() {
    const items = this.list.nativeElement.querySelectorAll('li');
    const lastItem: any = _.last(items);
    if (lastItem) {
      lastItem.scrollIntoView();
    }
  }

}
