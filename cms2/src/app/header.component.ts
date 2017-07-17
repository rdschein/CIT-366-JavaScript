import { Component, OnInit, } from '@angular/core';
import { DocumentsService } from './documents/documents.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.css']
})
export class HeaderComponent implements OnInit {
  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {
  }
  onSaveData() {
    this.documentsService.storeDocuments()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }
}
