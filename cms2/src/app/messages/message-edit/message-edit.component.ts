import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @Output() addMessageEvent = new EventEmitter<Message>();
  @Input() currentSender: string;
  @ViewChild('subjectInput') subject: ElementRef;
  @ViewChild('messageInput') msgText: ElementRef;
  constructor() {
    this.currentSender = 'Rob Schein';
  }

  ngOnInit() {
  }
  onSendMessage() {
    const subject = this.subject.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;
    const newMessage = new Message(1, subject, msgText, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }
}
