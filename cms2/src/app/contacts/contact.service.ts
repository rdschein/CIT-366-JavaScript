import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs/Subject';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

@Injectable()
export class ContactService {
  private contacts: Contact[] = [];
  maxContactId: number;
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact []>();
  constructor(private router: Router,
              private http: Http) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();

  }
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].id === id) {
        return this.contacts[i];
      }
    }
    return null;
  }
  deleteContact(contact: Contact) {
    if (contact == null) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }
  getMaxId(): number {
    let maxId = 0;
    for ( let i = 0; i < this.contacts.length; i++) {
      const currentId = parseInt(this.contacts[i].id, 10);
      if (currentId > maxId) {
        maxId++;
      }
    }
    return maxId;
  }
  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    } else {
      // this.maxContactId++;
      // newContact.id = this.maxContactId.toString();
      this.contacts.push(newContact);
      this.contactListChangedEvent.next(this.contacts.slice());
    }
  }
  updateContact(originalContact: Contact, newContact: Contact) {

    if (!originalContact || !newContact) {
      return;
    } else {
      let pos = -1;
      for (let x = 0; x < this.contacts.length; x++) {
        // const pos = this.contacts.indexOf(originalContact);
        if (this.contacts[x].id === originalContact.id) {
          pos = x;

        }
      }
      if (pos < 0) {
        return;
      } else {
        this.router.navigate(['/contacts']);
        newContact.id = originalContact.id;
        this.contacts[pos] = newContact;
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    }
  }
  getDocuments() {
    this.http.get('https://robscheincms.firebaseio.com/documents.json')
      .map(
        (response: Response) => {
          const contacts: Contact[] = response.json();
          for (const contacts0 of contacts) {
            if (!contacts0['children']) {
              contacts0['children'] = [];
            }
          }
          return contacts;
        }
      )
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contactChangedEvent.next(this.contacts.slice());
        }
      );
  }
}
