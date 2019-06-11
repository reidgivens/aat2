import {Component, Input, OnInit} from '@angular/core';
import {verticleSlide} from "../../animations";
import {Collection} from "../../model/collection";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  animations: [verticleSlide]
})
export class CollectionComponent implements OnInit {

  @Input() collection: Collection;
  public isCollapsed = false;

  constructor() { }

  ngOnInit() {
  }

}
