import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';

// any filter components imported here, also need to be imported in app.module.ts and be listed in
// both declarations and entryComponents
import { DatesComponent } from '../filters/dates/dates.component';
import { FrequenciesComponent } from '../filters/frequencies/frequencies.component';
import { SourcePositionComponent } from '../filters/source-position/source-position.component';
import { TelescopesComponent } from '../filters/telescopes/telescopes.component';
import { ConfigurationsComponent } from '../filters/configurations/configurations.component';
import { ReceiversComponent } from '../filters/receivers/receivers.component';
import { PolarizationsComponent } from '../filters/polarizations/polarizations.component';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  rootViewContainer: ViewContainerRef;

  // the names given to each component should match the result-type primaryFilter and secondaryFilters
  static FILTERS = {
    'dates': DatesComponent,
    'frequencies': FrequenciesComponent,
    'source-position': SourcePositionComponent,
    'telescopes': TelescopesComponent,
    'configurations': ConfigurationsComponent,
    'receivers': ReceiversComponent,
    'polarizations': PolarizationsComponent
  };

  constructor(private factoryResolver: ComponentFactoryResolver) {}

  loadFilter(viewContainerRef: ViewContainerRef, filterName: string) {
    this.rootViewContainer = viewContainerRef;
    const factory = this.factoryResolver.resolveComponentFactory(FilterService.FILTERS[filterName]);
    const component = factory.create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);
  }

}

/* So you wanna make a filter...
1) Create the filter component under app.filters e.g. ng generate component filters/[name of filter]
2) import that filter here, and add it to the static filters prop above with a name
    make the name the same as the folder that stores the component - not that is has to, but lets be consistent
3) import the filter component into the app.module and add it to both declarations and entryComponents
4) add the name of the filter to any result-type's primary or secondary filter list
 */
