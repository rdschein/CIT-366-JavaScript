import { Component, OnInit } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  id: string;
  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode = false;
  hasGroup = false;
  invalidGroupContact = false;
  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
        this.id = params['id'];

        if (!this.id) {
          this.editMode = false;
          return;
        }

        const originalContact = this.contactService.getContact(this.id);
        if (!originalContact) {
          return;
        }

        this.editMode = true;
        this.contact = originalContact;
        // this.contact = JSON.parse(JSON.stringify(originalContact));
        this.groupContacts = this.contact.group.slice();

      }
    )

  }

  onSubmit(form: NgForm) {
    if (this.editMode === true) {
      const newContact = new Contact(form.value.id, form.value.name, form.value.email, form.value.phone,
        form.value.imageUrl, this.groupContacts);
      this.contactService.updateContact(this.contact, newContact);
    } else {
      const newContact = new Contact('1' , 'Rob Schein', 'robschein17@gmail.com', '9524289067', '', null);
      this.contactService.addContact(newContact);
    }
    this.onCancel();

  }
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }
    if (newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }
  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }
  onRemoveItem(idx: number) {
    if (idx < 0 || idx >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }
}
