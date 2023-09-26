import { Component } from '@angular/core';
import { MessagesService } from './messages.service';
import { ThreadsService } from './threads.service';
import { UsersService } from './users.service';
import { ChatExampleData } from './data/chat-example-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public messagesService: MessagesService, public threadsService: ThreadsService, public userService: UsersService) {

    ChatExampleData.init(messagesService, threadsService, userService)
  }
}
