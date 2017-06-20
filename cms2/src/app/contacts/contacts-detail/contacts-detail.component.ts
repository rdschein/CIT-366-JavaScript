import {Component, Input, OnInit} from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  contact: Contact;
  id: string;
  contacts: Contact[] = [];
  constructor(private contactService: ContactService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) =>
      this.id = params['id']);
      this.contact = this.contactService.getContact(this.id);
  }
  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router .navigate(['/contacts'], {relativeTo: this.activatedRoute});
  }

}
