import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../../animations";
import { FormGroup, FormControl, FormArray} from "@angular/forms";
import { SelectedFilterService} from "../../services/selected-filter.service";

@Component({
  selector: 'app-polarizations',
  templateUrl: './polarizations.component.html',
  styleUrls: ['./polarizations.component.scss'],
  animations: [verticleSlide]
})
export class PolarizationsComponent implements OnInit {

  public isCollapsed = true;
  public polarizationGroup: FormGroup;
  public validPolarizations = [
    { name: 'RR', count: 36298722, selected: false },
    { name: 'LL', count: 1060769, selected: false },
    { name: 'RR, LL', count: 205353, selected: false },
    { name: 'RR, RL, LR, LL', count: 1041822, selected: false },
    { name: 'XX', count: 629, selected: false },
    { name: 'XX, YY', count: 204819, selected: false },
    { name: 'XX, XY, YX, YY', count: 15875, selected: false }
  ];
  constructor(private selectedFilterService: SelectedFilterService ) { }

  ngOnInit() {
    this.polarizationGroup = new FormGroup({
      polarizations: new FormArray([], {updateOn: 'change'})
    });
    this.addCheckboxes();
  }

  private addCheckboxes(){
    // add a form control for each validTelescope
    this.validPolarizations.map((o) => {
      const control = new FormControl(o.selected);
      (this.polarizationGroup.controls.polarizations as FormArray).push(control);
    });
    // now subscribe to changes to any of these
    (this.polarizationGroup.controls.polarizations as FormArray).valueChanges.subscribe(values => {
      for (let i in values){
        if(values[i]){
          this.addSelectedFilter('Polarization', 'polarization', this.validPolarizations[i].name);
        } else {
          this.removeSelectedFilter('polarization', this.validPolarizations[i].name);
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
