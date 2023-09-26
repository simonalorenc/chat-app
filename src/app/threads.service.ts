import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Thread } from './thread.model';
import { MessagesService } from './messages.service';
import { Message } from './message.model';
import { map, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThreadsService {
  threads: Observable<{ [key: string]: Thread }>;
  orderedThreads: Observable<Thread[]>;
  currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());
  currentThreadMessages: Observable<Message[]>

  constructor(public messagesService: MessagesService) {
    this.threads = messagesService.messages.pipe(
      map((messages: Message[]) => {
        const threads: { [key: string]: Thread } = {};
        messages.map((message: Message) => {
          threads[message.thread.id] =
            threads[message.thread.id] || message.thread;

          const messagesThread: Thread = threads[message.thread.id]
          if (
            !messagesThread.lastMessage ||
            messagesThread.lastMessage.sentAt < message.sentAt
          ) {
            messagesThread.lastMessage = message
          }
        });
        return threads
      })
    )
    this.orderedThreads = this.threads.pipe(
      map((threadGroups: { [key: string]: Thread }) => {
        const threads: Thread[] = Object.values(threadGroups)
        return threads.sort((t1: Thread, t2: Thread) => {
          const dateA = t1.lastMessage?.sentAt || new Date(0)
          const dateB = t2.lastMessage?.sentAt || new Date(0)
          return dateB.getTime() - dateA.getTime()
        })
      })
    )
    this.currentThread.subscribe(this.messagesService.markThreadAsRead)

    this.currentThreadMessages = combineLatest([
      this.currentThread,
      messagesService.messages
    ]).pipe(
      map(([currentThread, messages]: [Thread, Message[]]) => {
        if (currentThread && messages.length > 0) {
          return messages
            .filter((message: Message) => message.thread.id === currentThread.id)
            .map((message: Message) => {
              message.isRead = true
              return message;
            })
        } else {
          return []
        }
      })
    )
  }

  setCurrentThread(newThread: Thread) {
    this.currentThread.next(newThread)
  }
}
