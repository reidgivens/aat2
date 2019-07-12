import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../model/project";

@Component({
  selector: 'app-project-results',
  templateUrl: './project-results.component.html',
  styleUrls: ['./project-results.component.scss']
})
export class ProjectResultsComponent implements OnInit {

  @Input() searchResults: Array<Project>;
  constructor() {
    console.log('construct results');
    console.log(this.searchResults);
  }

  ngOnInit() {
    console.log('init results');
    console.log(this.searchResults);
  }

}
