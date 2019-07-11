import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-results',
  templateUrl: './project-results.component.html',
  styleUrls: ['./project-results.component.scss']
})
export class ProjectResultsComponent implements OnInit {

  @Input() searchResults: Array<any>;
  constructor() {
    console.log('construct results');
    console.log(this.searchResults);
  }

  ngOnInit() {
    console.log('init results');
    console.log(this.searchResults);
  }

}
