import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DocumentsService {
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();

  constructor(private http: Http) {
    this.getDocsfromDB();

  }
  storeDocuments() {

    const docString = JSON.stringify(this.getDocuments());
    const header = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: header});
    return this.http.put('https://robscheincms.firebaseio.com/documents.json', docString);

  }


  getDocuments(): Document[] {
    return this.documents;
  }
  getDocsfromDB() {
    this.http.get('https://robscheincms.firebaseio.com/documents.json')
      .map(
        (response: Response) => {
          const docs: Document[] = response.json();
          for (const doc0 of docs) {
            if (!doc0['children']) {
              doc0['children'] = [];
            }
          }
          return docs;
        }
      )
      .subscribe(
        (docs: Document[]) => {
          this.documents = docs;
          this.maxDocumentId = this.getMaxId();
          this.documentListChangedEvent.next(this.documents.slice());

        }
      );
  }
  getDocument(id: string): Document {
    for (let i = 0; i < this.documents.length; i++) {
      if (this.documents[i].id === id) {
        return this.documents[i];
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (document == null) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
    // this.storeDocuments();
  }
  getMaxId(): number {
    let maxId = 0;
    for ( let i = 0; i < this.documents.length; i++) {
      const currentId = parseInt(this.documents[i].id, 10);
      if (currentId > maxId) {
        maxId++;
      }
    }
    return maxId;
  }
  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    } else {
      this.maxDocumentId++;
      newDocument.id = this.maxDocumentId.toString();
      this.documents.push(newDocument);
      this.documentListChangedEvent.next(this.documents.slice());
    }
  }
  updateDocument(originalDocument: Document, newDocument: Document) {

    if (!originalDocument || !newDocument) {
      return;
    } else {
      const pos = this.documents.indexOf(originalDocument);
      if (pos < 0) {
        window.location.href = '../documents';
        return;
      } else {
        newDocument.id = originalDocument.id;
        this.documents[pos] = newDocument;
        this.documentListChangedEvent.next(this.documents.slice());
      }
    }
  }

}
