import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ThreadsService } from '../threads.service';

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.scss']
})
export class ChatThreadsComponent {
  threads: Observable<any>

  constructor(public threadsService: ThreadsService) {
    this.threads = threadsService.orderedThreads
  }
}
