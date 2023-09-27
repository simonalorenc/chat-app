import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { FromNowPipe } from '../from-now.pipe';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {
  @Input() message!: Message;
  currentUser!: User;
  incoming!: boolean;

  constructor(public UsersService: UsersService) {}

  ngOnInit(): void {
    this.UsersService.currentUser.subscribe((user: User | null) => {
      if (user !== null) {
        this.currentUser = user;
        if (this.message.author && user) {
          [(this.incoming = this.message.author.id !== user.id)];
        }
      }
    });
  }
}
