import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

@Injectable()
export class MessagesService {
  messages: Message[];
  maxMessageId: number;
  messageChangeEvent = new EventEmitter<Message[]>()
  constructor(private http: Http) {
    this.messages = MOCKMESSAGES;
  }

  /*getMessages(): Message[] {
    return this.messages.slice();
  } */
  getMessage(id: string): Message {
    for (let i = 0; i < this.messages.length; i++) {
      if (this.messages[i].id === id) {
        return this.messages[i];
      }
    }
    return null;
  }
  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }

  getMessages() {
    this.http.get('https://robscheincms.firebaseio.com/documents.json')
      .map(
        (response: Response) => {
          const messagess: Message[] = response.json();
          for (const message0 of messagess) {
            if (!message0['children']) {
              message0['children'] = [];
            }
          }
          return messagess;
        }
      )
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messageChangeEvent.next(this.messages.slice());
        }
      );

  }
  getMaxId(): number {
    let maxId = 0;
    for (let i = 0; i < this.messages.length; i++) {
      const currentId = parseInt(this.messages[i].id, 10);
      if (currentId > maxId) {
        maxId++;
      }
    }
    return maxId;
  }
}
