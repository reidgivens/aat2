import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../../animations";
import { FormGroup, FormControl, FormArray} from "@angular/forms";
import { SelectedFilterService} from "../../services/selected-filter.service";

@Component({
  selector: 'app-telescopes',
  templateUrl: './telescopes.component.html',
  styleUrls: ['./telescopes.component.scss'],
  animations: [verticleSlide]
})
export class TelescopesComponent implements OnInit {

  public isCollapsed = true;
  public telescopeGroup: FormGroup;
  public validTelescopes = [
    {id: 'VLA', name: 'VLA', selected: false},
    {id: 'VLBA', name: 'VLBA', selected: false},
    {id: 'ALMA', name: 'ALMA', selected: false}
  ];

  constructor(private selectedFilterService: SelectedFilterService) { }

  ngOnInit() {
    this.telescopeGroup = new FormGroup({
      telescopes: new FormArray([], {updateOn: 'change'})
    });
    this.addCheckboxes();
  }

  private addCheckboxes(){
    // add a form control for each validTelescope
    this.validTelescopes.map((o) => {
      const control = new FormControl(o.selected);
      (this.telescopeGroup.controls.telescopes as FormArray).push(control);
    });
    // now subscribe to changes to any of these
    (this.telescopeGroup.controls.telescopes as FormArray).valueChanges.subscribe(values => {
      for (let i in values){
        if(values[i]){
          this.addSelectedFilter('Telescope', 'telescope', this.validTelescopes[i].name);
        } else {
          this.removeSelectedFilter('telescope', this.validTelescopes[i].name);
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
