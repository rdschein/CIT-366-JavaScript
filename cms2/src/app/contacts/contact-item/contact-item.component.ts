import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Contact } from '../contacts.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  @Output() contactSelected = new EventEmitter<void>();
  constructor() { }

  onSelected() {
    this.contactSelected.emit();
  }
  ngOnInit() {
  }

}
