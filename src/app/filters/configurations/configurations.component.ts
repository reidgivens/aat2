import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../../animations";
import { FormGroup, FormControl, FormArray} from "@angular/forms";
import { SelectedFilterService} from "../../services/selected-filter.service";


@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss'],
  animations: [verticleSlide]
})
export class ConfigurationsComponent implements OnInit {

  public isCollapsed = true;
  public configurationGroup: FormGroup;
  public validConfigurations = [
    { name: 'A', count: 14832, selected: false},
    { name: 'A->D', count: 2283, selected: false},
    { name: 'B', count: 18603, selected: false},
    { name: 'B->A', count: 1, selected: false},
    { name: 'B->BnA', count: 510, selected: false},
    { name: 'BnA', count: 1826, selected: false},
    { name: 'BnA->A', count: 1549, selected: false},
    { name: 'C', count: 15849, selected: false},
    { name: 'C->B', count: 720, selected: false},
    { name: 'C->CnB', count: 365, selected: false},
    { name: 'C->CNB', count: 305, selected: false},
    { name: 'CnB', count: 1655, selected: false},
    { name: 'CnB->B', count: 622, selected: false},
    { name: 'D', count: 17704, selected: false},
    { name: 'D->C', count: 237, selected: false},
    { name: 'D->DnC', count: 228, selected: false},
    { name: 'DnC', count: 1941, selected: false},
    { name: 'DnC->C', count: 382, selected: false},
    { name: 'DnC-C', count: 60, selected: false}
  ];

  constructor(private selectedFilterService: SelectedFilterService) { }

  ngOnInit() {
    this.configurationGroup = new FormGroup({
      configurations: new FormArray([], {updateOn: 'change'})
    });
    this.addCheckboxes();
  }

  private addCheckboxes(){
    // add a form control for each validTelescope
    this.validConfigurations.map((o) => {
      const control = new FormControl(o.selected);
      (this.configurationGroup.controls.configurations as FormArray).push(control);
    });
    // now subscribe to changes to any of these
    (this.configurationGroup.controls.configurations as FormArray).valueChanges.subscribe(values => {
      for (let i in values){
        if(values[i]){
          this.addSelectedFilter('Configuration', 'configuration', this.validConfigurations[i].name);
        } else {
          this.removeSelectedFilter('configuration', this.validConfigurations[i].name);
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
