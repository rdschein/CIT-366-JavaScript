import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[]= [
  ];
  constructor(private documentService: DocumentsService) {
    this.documents = documentService.getDocuments();
  }

  ngOnInit() {
    this.documentService.documentChangedEvent.subscribe((document: Document[]) =>
      this.documents = document
    );
  }
}
