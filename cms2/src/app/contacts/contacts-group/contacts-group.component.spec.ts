import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsGroupComponent } from './contacts-group.component';

describe('ContactsGroupComponent', () => {
  let component: ContactsGroupComponent;
  let fixture: ComponentFixture<ContactsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
