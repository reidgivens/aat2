import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FiltersComponent } from './filters/filters.component';
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
import { CollectionComponent } from './filters/collection/collection.component';

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
    ImageResultsComponent,
    CollectionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
