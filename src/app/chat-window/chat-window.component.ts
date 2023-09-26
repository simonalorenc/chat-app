import {
  ChangeDetectionStrategy,
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
    public messageService: MessagesService,
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
  }
}
