import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contacts.model';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  @Output() contactWasSelected = new EventEmitter<Contact>();
  contact: Contact[] = [
    new Contact(1, 'Bro. Jackson', 'jacksonk@byui.edu', '208-496-3771', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', null),
    new Contact(2, 'Bro. Barzee', 'barzeer@byui.edu', '208-496-3768', 'https://web.byui.edu/Directory/Employee/barzeer.jpg', null)
  ];

  constructor() { }

  ngOnInit() {
  }
  onContactSelected(contact: Contact) {
    this.contactWasSelected.emit(contact);
  }
}
