import {Component, Input, OnInit} from '@angular/core';
import {Collection} from "../model/collection";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Input() collection: Collection;
  public exposeTertiaryFilters = false;
  constructor() { }

  ngOnInit() {
  }

}
