import { Component, OnInit } from '@angular/core';
import { verticleSlide } from "../../../animations";
import { FormGroup, FormControl } from "@angular/forms";
import { SelectedFilterService } from "../../services/selected-filter.service";
import { ValidateDate } from "../../validators/date-validator";
import { FilterFormService } from "../../services/filter-form.service";
import { Subscription } from "rxjs";
import {SelectedFilter} from "../../model/selected-filter";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: [verticleSlide]
})
export class ProjectComponent implements OnInit {

  public isCollapsed: boolean = true;
  public projectGroup: FormGroup; // the form group for controls in this component
  public filterForm: FormGroup; // the reference to our parent form
  public filterFormSub: Subscription; // the subscription to keep our filterForm updated
  public selectedFilters: Array<SelectedFilter>;
  public selectedFiltersSub: Subscription;

  constructor(private selectedFilterService: SelectedFilterService, private filterFormService: FilterFormService) { }

  ngOnInit() {
    this.filterFormSub = this.filterFormService.filterForm$.subscribe(filterForm => {
      this.filterForm = filterForm;
    });

    this.projectGroup = new FormGroup({
      pi: new FormControl(''),
      title: new FormControl(''),
      abstract: new FormControl(''),
      project_code: new FormControl(''),
    });

    this.filterFormService.addFilter(this.projectGroup);

    this.selectedFiltersSub = this.selectedFilterService.selectedFilters$.subscribe( selectedFilters => {
      this.selectedFilters = selectedFilters;
      this.projectGroup.get('pi').reset();
      this.projectGroup.get('title').reset();
      this.projectGroup.get('abstract').reset();
      this.projectGroup.get('project_code').reset();
      this.loadFilters();
    });

  }

  loadFilters(): void {
    for(let filter of this.selectedFilters){
      switch (filter.name) {
        case 'pi':
        case 'title':
        case 'abstract':
        case 'project_code':
          this.projectGroup.get(filter.name).setValue(filter.value);
          break;
      }
    }
  }

  ngOnDestroy(){
    this.filterFormService.deleteFilterByHasKey('pi');
    if (this.selectedFiltersSub) { this.selectedFiltersSub.unsubscribe(); }
    if (this.filterFormSub) { this.filterFormSub.unsubscribe(); }
  }

}
