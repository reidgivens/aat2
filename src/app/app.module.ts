import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule} from "@angular/forms";
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EnvServiceProvider} from "./env/env.service.provider";
import { WebAnalyticsService } from "./web-analytics/web-analytics.service";

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutingModule } from './app-routing.module';
import { SplashComponent } from './splash/splash.component';
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SplashComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [EnvServiceProvider, WebAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
