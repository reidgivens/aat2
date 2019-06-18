import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule} from "@angular/forms";
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Globals } from './globals';
import { FiltersComponent } from './filters/filters.component';
import { FilterService} from "./services/filter.service";

import { DatesComponent } from './filters/dates/dates.component';
import { FrequenciesComponent } from './filters/frequencies/frequencies.component';
import { SourcePositionComponent } from './filters/source-position/source-position.component';
import { TelescopesComponent } from './filters/telescopes/telescopes.component';
import { ConfigurationsComponent } from './filters/configurations/configurations.component';
import { ReceiversComponent } from './filters/receivers/receivers.component';
import { PolarizationsComponent } from './filters/polarizations/polarizations.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { ObservationResultsComponent } from './observation-results/observation-results.component';
import { ProjectResultsComponent } from './project-results/project-results.component';
import { ImageResultsComponent } from './image-results/image-results.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    DatesComponent,
    FrequenciesComponent,
    SourcePositionComponent,
    TelescopesComponent,
    ConfigurationsComponent,
    ReceiversComponent,
    PolarizationsComponent,
    HeaderComponent,
    FooterComponent,
    ObservationResultsComponent,
    ProjectResultsComponent,
    ImageResultsComponent
  ],
  entryComponents: [
    DatesComponent,
    FrequenciesComponent,
    SourcePositionComponent,
    TelescopesComponent,
    ConfigurationsComponent,
    ReceiversComponent,
    PolarizationsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [ Globals, FilterService ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
