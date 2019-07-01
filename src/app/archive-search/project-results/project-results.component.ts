import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-results',
  templateUrl: './project-results.component.html',
  styleUrls: ['./project-results.component.scss']
})
export class ProjectResultsComponent implements OnInit {

  @Input() searchResults: Array<any>;
  constructor() { }

  ngOnInit() {
  }

}
