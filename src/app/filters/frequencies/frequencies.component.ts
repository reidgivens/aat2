import { Component, OnInit } from '@angular/core';
import {verticleSlide} from "../../animations";
import {FormGroup, FormControl} from "@angular/forms";
import { SelectedFilterService} from "../../services/selected-filter.service";
import { ValidateFrequency } from "../../validators/frequency-validator";
import {Subscription} from "rxjs";
import {FilterFormService} from "../../services/filter-form.service";
import {SelectedFilter} from "../../model/selected-filter";

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
  public filterForm: FormGroup; // the reference to our parent form
  public filterFormSub: Subscription; // the subscription to keep our filterForm updated
  public selectedFilters: Array<SelectedFilter>;
  public selectedFiltersSub: Subscription;

  constructor(private selectedFilterService: SelectedFilterService, private filterFormService: FilterFormService) { }

  ngOnInit() {
    this.filterFormSub = this.filterFormService.filterForm$.subscribe(filterForm => {
      this.filterForm = filterForm;
    });

    this.frequencyGroup = new FormGroup({
      start_frequency_num: new FormControl('', { validators: ValidateFrequency, updateOn: "blur"}),
      end_frequency_num: new FormControl('', { validators: ValidateFrequency, updateOn: "blur"}),
      start_frequency_hz: new FormControl('GHz'),
      end_frequency_hz: new FormControl('GHz'),
      start_frequency: new FormControl(''),
      end_frequency: new FormControl('')
    });

    // start_frequency and end_frequency is what gets submitted
    // the other four are parts just for the UI so we have controls for them
    // when any of the four 'fake' ones change, we glue it together in the real ones
    // the fake ones are filtered out on form submit

    this.filterFormService.addFilter(this.frequencyGroup);

    this.selectedFiltersSub = this.selectedFilterService.selectedFilters$.subscribe( selectedFilters => {
      this.selectedFilters = selectedFilters;
      this.frequencyGroup.get('start_frequency_num').reset();
      this.frequencyGroup.get('end_frequency_num').reset();
      this.frequencyGroup.get('start_frequency_hz').setValue(this.validHz[0]);
      this.frequencyGroup.get('end_frequency_hz').setValue(this.validHz[0]);
      this.loadFilters();
    });

    this.onChanges();
  }

  ngOnDestroy(){
    this.filterFormService.deleteFilterByHasKey('end_frequency');
  }

  updateStartHz(hz: string){
    let fc = this.frequencyGroup.get('start_frequency_hz');
    fc.setValue(hz);
  }

  updateEndHz(hz: string){
    let fc = this.frequencyGroup.get('end_frequency_hz');
    fc.setValue(hz);
  }

  loadFilters(): void {
    for(let filter of this.selectedFilters){
      if(filter.name == 'start_frequency'){
        let freqParts = filter.value.split(' ');
        this.frequencyGroup.get('start_frequency_num').setValue(freqParts[0]);
        if(this.validHz.indexOf(freqParts[1]) == -1){
          this.startHz = this.validHz[0];
          this.frequencyGroup.get('start_frequency_hz').setValue(this.validHz[0]);
        } else {
          this.frequencyGroup.get('start_frequency_hz').setValue(freqParts[1]);
        }
      } else if (filter.name == 'end_frequency'){
        let freqParts = filter.value.split(' ');
        this.frequencyGroup.get('end_frequency_num').setValue(freqParts[0]);
        if(this.validHz.indexOf(freqParts[1]) == -1){
          this.endHz = this.validHz[0];
          this.frequencyGroup.get('end_frequency_hz').setValue(this.validHz[0]);
        } else {
          this.frequencyGroup.get('end_frequency_hz').setValue(freqParts[1]);
        }
      }
    }
  }

  onChanges(): void {
    // from object in UI control to the submittable fields
    this.frequencyGroup.get('start_frequency_num').valueChanges.subscribe(val => {
      if(this.frequencyGroup.get('start_frequency_num').valid && val !== null) {
        let fc = this.frequencyGroup.get('start_frequency_hz');
        this.frequencyGroup.get('start_frequency').setValue(val + ' ' + fc.value);
      }
    });
    this.frequencyGroup.get('end_frequency_num').valueChanges.subscribe(val => {
      if(this.frequencyGroup.get('end_frequency_num').valid && val !== null) {
        let fc = this.frequencyGroup.get('end_frequency_hz');
        this.frequencyGroup.get('end_frequency').setValue(val + ' ' + fc.value);
      }
    });
    this.frequencyGroup.get('start_frequency_hz').valueChanges.subscribe(val => {
      if(this.frequencyGroup.get('start_frequency_hz').valid && val !== null) {
        this.startHz = val;
        let fc = this.frequencyGroup.get('start_frequency_num');
        if(fc.value !== null) {
          this.frequencyGroup.get('start_frequency').setValue(fc.value + ' ' + val);
        } else {
          this.frequencyGroup.get('start_frequency').reset();
        }
      }
    });
    this.frequencyGroup.get('end_frequency_hz').valueChanges.subscribe(val => {
      if(this.frequencyGroup.get('end_frequency_hz').valid && val !== null) {
        this.endHz = val;
        let fc = this.frequencyGroup.get('end_frequency_num');
        if(fc.value !== null) {
          this.frequencyGroup.get('end_frequency').setValue(fc.value + ' ' + val);
        } else {
          this.frequencyGroup.get('end_frequency').reset();
        }
      }
    });
  }

}
