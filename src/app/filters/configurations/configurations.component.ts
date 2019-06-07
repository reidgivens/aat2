import { Component, OnInit } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import {slideDown, slideUp} from "../../animations";

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss'],
  animations: [
    trigger('vslider', [
      transition(':enter', [useAnimation(slideDown)]),
      transition(':leave', [useAnimation(slideUp)])
    ])
  ]
})
export class ConfigurationsComponent implements OnInit {

  public isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
