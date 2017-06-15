import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[]= [
    new Document(1, 'Doc1', 'I am document 1', 'http://www.espn.com/', null),
    new Document(2, 'Doc2', 'I am document 2', 'http://www.espn.com/', null),
    new Document(3, 'Doc3', 'I am document 3', 'http://www.espn.com/', null),
    new Document(4, 'Doc4', 'I am document 4', 'http://www.espn.com/', null),

  ]
  constructor() { }

  ngOnInit() {
  }
  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
