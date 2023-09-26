import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { Observable, Subject } from 'rxjs';
import { Thread } from './thread.model';
import { User } from './user.model';
import { filter, scan, shareReplay, map } from 'rxjs/operators';

const initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  newMessages: Subject<Message> = new Subject<Message>();
  messages: Observable<Message[]>;
  updates: Subject<any> = new Subject<any>();
  create: Subject<Message> = new Subject<Message>();
  markThreadAsRead: Subject<any> = new Subject<any>()

  constructor() {
    this.messages = this.updates.pipe(
      scan((messages: Message[], operation: IMessagesOperation) => {
        return operation(messages);
      }, initialMessages),
      shareReplay(1)
    );
    this.create.pipe(
      map(function (message: Message): IMessagesOperation {
        return (messages: Message[]) => {
          return messages.concat(message)
        }
      })
    )
    .subscribe(this.updates)
    this.newMessages
      .subscribe(this.create)
  }

  addMessage(newMessage: Message): void {
    this.updates.next((messages: Message[]): Message[] => {
      return messages.concat(newMessage);
    });
  }

  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages.pipe(
      filter((message: Message) => {
        return message.thread.id === thread.id && message.author.id !== user.id;
      })
    );
  }
}
