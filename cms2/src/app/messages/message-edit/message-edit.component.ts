import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import {MessagesService} from '../messages.service';

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
  constructor(private messageService: MessagesService) {
    this.currentSender = '5';
  }

  ngOnInit() {
  }
  onSendMessage() {
    const subject = this.subject.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;
    const newMessage = new Message('1', subject, msgText, this.currentSender);
    this.messageService.addMessage(newMessage);
  }
}
