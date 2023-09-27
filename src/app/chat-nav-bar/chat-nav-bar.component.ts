import { Component } from '@angular/core';
import { MessagesService } from '../messages.service';
import { ThreadsService } from '../threads.service';
import { Thread } from '../thread.model';
import { Message } from '../message.model';
import { map, combineLatest } from 'rxjs';

@Component({
  selector: 'app-chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html',
  styleUrls: ['./chat-nav-bar.component.scss']
})
export class ChatNavBarComponent {
  unreadMessagesCount!: number;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService) {
  }

  ngOnInit(): void {
      combineLatest(this.threadsService.currentThread, this.messagesService.messages)
      .subscribe(([currentThread, messages]: [Thread, Message[]]) => {
        this.unreadMessagesCount = messages.reduce((sum: number, m: Message) => {
          const messageIsInCurrentThread: boolean =
            m.thread && currentThread && currentThread.id === m.thread.id;
          if (m && !m.isRead && !messageIsInCurrentThread) {
            sum = sum + 1;
          }
          return sum;
        }, 0);
      });
  }
}
