import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SelectedFilterService} from "../../services/selected-filter.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'ngdb-modal-content',
  templateUrl: './load-filters.component.html',
  styleUrls: ['./load-filters.component.scss']
})
export class LoadFiltersComponent implements OnInit {

  public savedFilters: any;
  public savedFiltersSub: Subscription;

  constructor(public activeModal: NgbActiveModal, public selectedFilterService: SelectedFilterService) {
    this.savedFiltersSub = this.selectedFilterService.savedFilters$.subscribe((savedFilters) => {
      this.savedFilters = savedFilters;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.savedFiltersSub){ this.savedFiltersSub.unsubscribe(); }
  }

  loadFilters(name: string){
    this.selectedFilterService.loadFilters(name);
    this.activeModal.close('Loaded Filters');
  }

  deleteFilters(name: string){
    this.selectedFilterService.deleteSavedFilters(name);
  }

}
