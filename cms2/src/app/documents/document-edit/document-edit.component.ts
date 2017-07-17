import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, NgForm } from '@angular/forms';
import { DocumentsService } from '../documents.service';
import { Document } from '../document.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  id: string;
  document: Document;
  editMode = false;
  constructor(private documentService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }
      const originalDocument = this.documentService.getDocument(this.id);
      if (!originalDocument) {
        return;
      }
      this.editMode = true;
     /* this.document = JSON.parse(JSON.stringify(originalDocument)); */
     this.document = originalDocument;
    })
  }
  onSubmit( form: NgForm) {
    const newDocument = new Document(form.value.id, form.value.name, form.value.description, form.value.url, form.value.children)
    if (this.editMode === true) {
      this.documentService.updateDocument(this.document, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
  }
  onCancel() {
    window.location.href = '/documents';
  }
}​
