import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SelectedFilter} from "../../model/selected-filter";
import {SelectedFilterService} from "../../services/selected-filter.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'ngdb-modal-content',
  templateUrl: './save-filters.component.html',
  styleUrls: ['./save-filters.component.scss']
})
export class SaveFiltersComponent implements OnInit {

  public saveForm: FormGroup;
  public selectedFilters: Array<SelectedFilter>;
  public selectedFiltersSub: Subscription;

  constructor(public activeModal: NgbActiveModal, private selectedFilterService: SelectedFilterService) {
    this.saveForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')])
    });

    this.selectedFiltersSub = this.selectedFilterService.selectedFilters$.subscribe((selectedFilters) => {
      this.selectedFilters = selectedFilters;
    });
  }

  ngOnInit() {
  }

  saveFilters(){
    if(this.saveForm.valid){
      this.selectedFilterService.saveFilters(this.saveForm.get('name').value);
      this.activeModal.close('Save click');
    }
  }

  ngOnDestroy(){
    if(this.selectedFiltersSub){ this.selectedFiltersSub.unsubscribe(); }
  }

}
