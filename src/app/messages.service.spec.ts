import { TestBed } from '@angular/core/testing';

import { MessagesService } from './messages.service';
import { User } from './user.model';
import { Thread } from './thread.model';
import { Message } from './message.model';
import { fakeAsync, tick } from '@angular/core/testing';

describe('MessagesService', () => {
  it('should test', fakeAsync(() => {
    const user: User = new User('Nate', '');
    const thread: Thread = new Thread('t1', 'Nate', '');
    const m1: Message = new Message({
      author: user,
      text: 'Hi',
      thread: thread,
    });
    const m2: Message = new Message({
      author: user,
      text: 'Bye!',
      thread: thread,
    });
    const messagesService: MessagesService = new MessagesService();
    let newMessageReceived = false
    let messageCount = 0

    messagesService.newMessages.subscribe((message: Message) => {
      newMessageReceived = true
      console.log('=> newMessages: ' + message.text);
    });

    messagesService.messages.subscribe((messages: Message[]) => {
      console.log('=> messages: ' + messages.length);
      messageCount = messages.length
    });

    messagesService.addMessage(m1);
    messagesService.addMessage(m2);

    tick()

    expect(newMessageReceived).toBe(true);
    expect(messageCount).toBe(2)
  }));
});
