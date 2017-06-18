import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contacts.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
  providers: [ContactService]
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;
  constructor(private contactService: ContactService) {

  }

  ngOnInit() {
    const contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }



}
