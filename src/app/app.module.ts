import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OrgLandingComponent } from './org-landing/org-landing.component';
import {CarouselModule} from 'primeng/carousel';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    OrgLandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
