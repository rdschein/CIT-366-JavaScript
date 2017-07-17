import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contacts.model';

@Component({
  selector: 'app-contacts-group',
  templateUrl: './contacts-group.component.html',
  styleUrls: ['./contacts-group.component.css']
})
export class ContactsGroupComponent implements OnInit {

  @Input() contact: Contact;
  @Output() contactSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.contactSelected.emit();
  }
}
