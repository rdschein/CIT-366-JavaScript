import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() selectedFeature: string;
  title = 'app';

  constructor() {
    this.selectedFeature = 'documents';
  }

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;

  }
}
