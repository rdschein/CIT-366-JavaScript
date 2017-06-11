import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.css']
})
export class HeaderComponent implements OnInit {
  @Output() selectedFeatureEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  onSelected(selectedEvent: string) {
  this.selectedFeatureEvent.emit(selectedEvent);
  }
}
