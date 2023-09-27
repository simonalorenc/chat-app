import {
  ChangeDetectionStrategy,
  Inject,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Thread } from '../thread.model';
import { Message } from '../message.model';
import { User } from '../user.model';
import { MessagesService } from '../messages.service';
import { ThreadsService } from '../threads.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent implements OnInit {
  messages!: Observable<any>;
  currentThread!: Thread;
  draftMessage!: Message;
  currentUser!: User;

  constructor(
    public messagesService: MessagesService,
    public threadsService: ThreadsService,
    public UsersService: UsersService,
    public el: ElementRef
  ) {}

  ngOnInit(): void {
    this.messages = this.threadsService.currentThreadMessages;

    this.draftMessage = new Message();

    this.threadsService.currentThread.subscribe((thread: Thread) => {
      this.currentThread = thread;
    });

    this.UsersService.currentUser.subscribe((user: User | null) => {
      if(user !== null) {
        this.currentUser = user;
      }
    });

    this.messages
      .subscribe(
        (messages: Array<Message>) => {
          setTimeout(() => {
            this.scrollToBottom
          })
        }
      )
  }

  sendMessage(): void {
    const m: Message = this.draftMessage
    m.author = this.currentUser
    m.thread = this.currentThread
    m.isRead = true
    this.messagesService.addMessage(m)
    this.draftMessage = new Message()
  }

  onEnter(event:any): void {
    this.sendMessage()
    event.preventDefault()
  }

  scrollToBottom():void {
    const scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base')
    scrollPane.scrollTop = scrollPane.scrollHeight
  }
}
