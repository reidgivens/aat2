import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../../animations";
import {FormGroup, FormControl} from "@angular/forms";
import { SelectedFilterService} from "../../services/selected-filter.service";
import { ValidateFrequency } from "../../validators/frequency-validator";

@Component({
  selector: 'app-frequencies',
  templateUrl: './frequencies.component.html',
  styleUrls: ['./frequencies.component.scss'],
  animations: [verticleSlide]
})
export class FrequenciesComponent implements OnInit {

  public isCollapsed = true;
  private startHz: string = 'GHz';
  private endHz: string = 'GHz';
  public validHz: Array<string> = ['GHz','MHz','kHz','Hz'];

  public frequencyGroup: FormGroup;

  constructor(private selectedFilterService: SelectedFilterService) { }

  ngOnInit() {
    this.frequencyGroup = new FormGroup({
      startFrequency: new FormControl('', { validators: ValidateFrequency, updateOn: "blur"}),
      endFrequency: new FormControl('', { validators: ValidateFrequency, updateOn: "blur"})
    });

    this.frequencyGroup.get('startFrequency').valueChanges.subscribe(val => {
      // are we valid?
      if(!this.frequencyGroup.get('startFrequency').valid){
        return false;
      }
      this.addReplaceSelectedFilter('Start','start_frequency',val + ' ' + this.startHz);
    });

    this.frequencyGroup.get('endFrequency').valueChanges.subscribe(val => {
      // are we valid?
      if(!this.frequencyGroup.get('endFrequency').valid){
        return false;
      }
      this.addReplaceSelectedFilter('End','end_frequency',val + ' ' + this.endHz);
    });
  }

  updateStartHz(hz: string){
    this.startHz = hz;
    let fc = this.frequencyGroup.get('startFrequency');
    if(fc.touched) {
      fc.setValue(fc.value);
    }
  }

  updateEndHz(hz: string){
    this.endHz = hz;
    let fc = this.frequencyGroup.get('endFrequency');
    if(fc.touched) {
      fc.setValue(fc.value);
    }
  }

  addReplaceSelectedFilter(label: string, name: string, value: string){
    this.selectedFilterService.addReplaceSelectedFilter(label, name, value);
  }

}
