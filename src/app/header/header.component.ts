import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../animations";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [verticleSlide]

})
export class HeaderComponent implements OnInit {

  public showNav = true;
  public searchControlGroup: FormGroup;

  constructor() {
    this.searchControlGroup = new FormGroup({
      searchFormControl: new FormControl('', {updateOn: "change"})
    });
  }

  ngOnInit() {
  }

}
