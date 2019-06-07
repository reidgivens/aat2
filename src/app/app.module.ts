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
import { ResultsComponent } from './results/results.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

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
    ResultsComponent,
    HeaderComponent,
    FooterComponent
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
