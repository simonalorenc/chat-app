import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  currentUser: Subject<User | null> = new BehaviorSubject<User | null>(null)

  constructor() { }

  public setCurrentUser(newUser: User): void {
    this.currentUser.next(newUser)
  }
}
