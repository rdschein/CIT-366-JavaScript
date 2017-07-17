import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit, OnDestroy {
  contact: Contact[] = [];
  term: string;
  subscription: Subscription;
  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contact = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contact = contacts;
    });
  }
  onContactSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onKeyPress(value: string) {
    this.term = value;
  }
}
