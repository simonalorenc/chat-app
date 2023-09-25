import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  newMessages: Subject<Message> = new Subject<Message>()

  constructor() { }

  addMessage(message: Message): void {
    this.newMessages.next(message)
  }
}
