import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {SplashComponent} from "./splash/splash.component";

const routes: Routes = [
  { path: 'Search', loadChildren: () => import('./archive-search/archive-search.module').then(mod => mod.ArchiveSearchModule) },
  { path: '', component: SplashComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes,{ preloadingStrategy: PreloadAllModules } )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
