import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contacts.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): Contact[] {
    const newArray: Contact[] = [];

    // newArray = contacts.filter(
    //   (contact: Contact) =&gt; contact.name.toLowerCase().includes(term.toLowerCase())
    // );
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].name.indexOf(term) >= 0) {
        newArray.push(contacts[i]);
      }
    }
    if (newArray.length === 0) {
      return contacts;
    } else {
      return newArray;
    }
  }

}
