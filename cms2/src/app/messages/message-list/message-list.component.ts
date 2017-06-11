import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(1, 'Hello', 'Hello, nice to meet you', 'Rob Schein'),
    new Message(2, 'Response', 'Nice to meet you too', 'Winston Wu'),
    new Message(3, 'Homework Question', 'Can you remind me what my portion of the group project is?', 'Winston Wu')
  ];
  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
