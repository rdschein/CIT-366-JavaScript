import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';


@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contact: Contact[] = [
  ];

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contact = this.contactService.getContacts();
    this.contactService.contactChangedEvent.subscribe((contact: Contact[]) =>
      this.contact = contact);
  }
  onContactSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
