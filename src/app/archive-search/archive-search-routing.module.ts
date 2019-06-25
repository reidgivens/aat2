import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ArchiveSearchComponent} from "./archive-search.component";
import {ObservationResultsComponent} from "./observation-results/observation-results.component";
import {ImageResultsComponent} from "./image-results/image-results.component";
import {ProjectResultsComponent} from "./project-results/project-results.component";

const routes: Routes = [
  {
    path: '', component: ArchiveSearchComponent, children: [
      {path: 'Observations', component: ObservationResultsComponent},
      {path: 'Images', component: ImageResultsComponent},
      {path: 'Projects', component: ProjectResultsComponent},
      {path: 'VLASS', component: ObservationResultsComponent},
      {path: 'RealFast', component: ObservationResultsComponent},
      {path: 'Pulsars', component: ObservationResultsComponent},
      {path: '', redirectTo: 'Observations', pathMatch: 'full'},
      {path: '**', redirectTo: 'Observations', pathMatch: 'full'}
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchiveSearchRoutingModule {
}
