import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {ObservationResultsComponent} from "./observation-results/observation-results.component";
import {ImageResultsComponent} from "./image-results/image-results.component";
import {ProjectResultsComponent} from "./project-results/project-results.component";

// TODO: can the routes be generated from th e ResultType list - importing right components seems to be the issue
const appRoutes: Routes = [
  { path: 'Observations', component: ObservationResultsComponent },
  { path: 'Images', component: ImageResultsComponent },
  { path: 'Projects', component: ProjectResultsComponent },
  { path: 'VLASS', component: ObservationResultsComponent },
  { path: 'RealFast', component: ObservationResultsComponent },
  { path: 'Pulsars', component: ObservationResultsComponent },
  { path: '', redirectTo: '/Observations', pathMatch: 'full' },
  { path: '**', redirectTo: '/Observations', pathMatch: 'full' }
];


@NgModule({
  imports: [
    RouterModule.forRoot( appRoutes,{ enableTracing: false } ) // <-- debugging purposes only
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
