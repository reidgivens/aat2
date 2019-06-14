import { Component, OnInit } from '@angular/core';
import { verticleSlide } from "../../animations";
import {FormGroup, FormControl} from "@angular/forms";
import { SelectedFilterService} from "../../services/selected-filter.service";
import { ValidateDate } from "../../validators/date-validator";

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss'],
  animations: [verticleSlide]
})
export class DatesComponent implements OnInit {

  public isCollapsed: boolean = true;
  dateGroup: FormGroup;

  constructor(private selectedFilterService: SelectedFilterService) { }

  ngOnInit() {
    this.dateGroup = new FormGroup({
      toDate: new FormControl('', { validators: ValidateDate, updateOn: "blur"}),
      fromDate: new FormControl('', { validators: ValidateDate, updateOn: "blur"})
    });

    this.dateGroup.get('fromDate').valueChanges.subscribe(val => {
      // are we valid?
      if(!this.dateGroup.get('fromDate').valid){
        return false;
      }
      // the datepicker seems to send back an object with month, day and year. If that isn't use, then we get a string
      if(typeof val == "object" && val.hasOwnProperty('year')) {
        val = val.year + '-' + (val.month < 10 ? '0' : '') + val.month + '-' + (val.day < 10 ? '0' : '') + val.day;
      }
      this.addReplaceSelectedFilter('From','from_date',val);
    });

    this.dateGroup.get('toDate').valueChanges.subscribe(val => {
      // are we valid?
      if(!this.dateGroup.get('toDate').valid){
        return false;
      }
      // the datepicker seems to send back an object with month, day and year. If that isn't use, then we get a string
      if(typeof val == "object" && val.hasOwnProperty('year')) {
        val = val.year + '-' + val.month + '-' + val.day;
      }
      this.addReplaceSelectedFilter('To','to_date',val);
    });
  }

  addReplaceSelectedFilter(label: string, name: string, value: string){
    this.selectedFilterService.addReplaceSelectedFilter(label, name, value);
  }

}
