import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../../animations";
import { FormGroup, FormControl, FormArray} from "@angular/forms";
import { SelectedFilterService} from "../../services/selected-filter.service";

@Component({
  selector: 'app-receivers',
  templateUrl: './receivers.component.html',
  styleUrls: ['./receivers.component.scss'],
  animations: [verticleSlide]
})
export class ReceiversComponent implements OnInit {

  public isCollapsed = true;
  public receiverGroup: FormGroup;
  public validReceivers = [
    { name: 'C', count: 17939, selected: false },
    { name: 'K', count: 7868, selected: false },
    { name: 'KA', count: 5228, selected: false },
    { name: 'KU', count: 4439, selected: false },
    { name: 'L', count: 14859, selected: false },
    { name: 'P', count: 2490, selected: false },
    { name: 'S', count: 7016, selected: false },
    { name: 'Q', count: 4068, selected: false },
    { name: 'X', count: 27033, selected: false },
    { name: '06', count: 11101, selected: false },
    { name: '03', count: 7121, selected: false },
    { name: '07', count: 3668, selected: false },
    { name: '04', count: 866, selected: false },
    { name: '08', count: 590, selected: false },
    { name: '05', count: 211, selected: false },
    { name: '09', count: 172, selected: false },
    { name: '4', count: 50, selected: false },
    { name: '10', count: 14, selected: false },
    { name: 'Unspecified', count: 1, selected: false },
    { name: 'Subband:0', count: 18463, selected: false },
    { name: 'Subband:1', count: 5780, selected: false },
    { name: 'Subband:2', count: 5595, selected: false },
    { name: 'Subband:3', count: 5571, selected: false },
    { name: 'Subband:4', count: 5206, selected: false },
    { name: 'Subband:5', count: 5158, selected: false },
    { name: 'Subband:6', count: 5089, selected: false },
    { name: 'Subband:7', count: 5073, selected: false },
    { name: 'Subband:8', count: 701, selected: false },
    { name: 'Subband:9', count: 695, selected: false },
    { name: 'Subband:10', count: 692, selected: false },
    { name: 'Subband:11', count: 691, selected: false },
    { name: 'Subband:12', count: 640, selected: false },
    { name: 'Subband:13', count: 640, selected: false },
    { name: 'Subband:14', count: 596, selected: false },
    { name: 'Subband:15', count: 586, selected: false },
    { name: 'Subband:110', count: 1, selected: false },
    { name: 'Subband:111', count: 1, selected: false },
    { name: 'Subband:112', count: 1, selected: false },
    { name: 'Subband:113', count: 1, selected: false },
    { name: 'Subband:255', count: 6, selected: false }
  ];
  constructor(private selectedFilterService: SelectedFilterService ) { }

  ngOnInit() {
    this.receiverGroup = new FormGroup({
      receivers: new FormArray([], {updateOn: 'change'})
    });
    this.addCheckboxes();
  }

  private addCheckboxes(){
    // add a form control for each validTelescope
    this.validReceivers.map((o) => {
      const control = new FormControl(o.selected);
      (this.receiverGroup.controls.receivers as FormArray).push(control);
    });
    // now subscribe to changes to any of these
    (this.receiverGroup.controls.receivers as FormArray).valueChanges.subscribe(values => {
      for (let i in values){
        if(values[i]){
          this.addSelectedFilter('Receiver', 'receiver', this.validReceivers[i].name);
        } else {
          this.removeSelectedFilter('receiver', this.validReceivers[i].name);
        }
      }
    });
  }

  addSelectedFilter(label: string, name: string, value: string){
    this.selectedFilterService.addSelectedFilter(label, name, value);
  }

  removeSelectedFilter(name: string, value: string){
    this.selectedFilterService.removeSelectedFilter(name, value);
  }


}
