import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";

import  { ResultTypeService } from "./services/result-type.service";
import { FiltersComponent } from './filters/filters.component';
import { FilterService} from "./services/filter.service";

import { DatesComponent } from './filters/dates/dates.component';
import { FrequenciesComponent } from './filters/frequencies/frequencies.component';
import { SourcePositionComponent } from './filters/source-position/source-position.component';
import { TelescopesComponent } from './filters/telescopes/telescopes.component';
import { ConfigurationsComponent } from './filters/configurations/configurations.component';
import { ReceiversComponent } from './filters/receivers/receivers.component';
import { PolarizationsComponent } from './filters/polarizations/polarizations.component';

import { ObservationResultsComponent } from './observation-results/observation-results.component';
import { ProjectResultsComponent } from './project-results/project-results.component';
import { ImageResultsComponent } from './image-results/image-results.component';

import { ArchiveSearchRoutingModule } from './archive-search-routing.module';
import { ArchiveSearchComponent } from './archive-search.component';
import { SelectedFiltersComponent } from './selected-filters/selected-filters.component';
import { SaveFiltersComponent } from './selected-filters/save-filters/save-filters.component';
import { LoadFiltersComponent } from './selected-filters/load-filters/load-filters.component';

@NgModule({
  declarations: [
    FiltersComponent,
    DatesComponent,
    FrequenciesComponent,
    SourcePositionComponent,
    TelescopesComponent,
    ConfigurationsComponent,
    ReceiversComponent,
    PolarizationsComponent,
    ObservationResultsComponent,
    ProjectResultsComponent,
    ImageResultsComponent,
    ArchiveSearchComponent,
    SelectedFiltersComponent,
    SaveFiltersComponent,
    LoadFiltersComponent
  ],
  providers: [ ResultTypeService, FilterService ],
  entryComponents: [
    DatesComponent,
    FrequenciesComponent,
    SourcePositionComponent,
    TelescopesComponent,
    ConfigurationsComponent,
    ReceiversComponent,
    PolarizationsComponent,
    SaveFiltersComponent,
    LoadFiltersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    ArchiveSearchRoutingModule,
    HttpClientModule
  ]
})
export class ArchiveSearchModule { }
