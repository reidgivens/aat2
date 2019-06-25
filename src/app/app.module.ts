import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule} from "@angular/forms";
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutingModule } from './app-routing.module';
import { SplashComponent } from './splash/splash.component';

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
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
