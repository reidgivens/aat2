import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ArchiveSearchComponent} from "./archive-search.component";
import {ObservationResultsComponent} from "./observation-results/observation-results.component";
import {ImageResultsComponent} from "./image-results/image-results.component";
import {ProjectResultsComponent} from "./project-results/project-results.component";

import {ObservationDetailsComponent} from "./observation-details/observation-details.component";
import {ProjectDetailsComponent} from "./project-details/project-details.component";

const routes: Routes = [
  {
    path: 'Search', component: ArchiveSearchComponent, children: [
      {path: 'Observations', component: ObservationResultsComponent},
      {path: 'Images', component: ImageResultsComponent},
      {path: 'Projects', component: ProjectResultsComponent},
      {path: '', redirectTo: 'Observations', pathMatch: 'full'},
      {path: '**', redirectTo: 'Observations', pathMatch: 'full'}
    ]
  },
  {path: 'Observation/:objectId', component: ObservationDetailsComponent},
  {path: 'Project/:objectId', component: ProjectDetailsComponent},
  {path: '', redirectTo: 'Search', pathMatch: 'full'},
  {path: '**', redirectTo: 'Search', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchiveSearchRoutingModule {
}
