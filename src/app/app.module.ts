import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OrgLandingComponent } from './org-landing/org-landing.component';
import {CarouselModule} from 'primeng/carousel';
import { OrgTeamsViewComponent } from './org-teams-view/org-teams-view.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { RippleModule } from 'primeng/ripple';
import {TabViewModule} from 'primeng/tabview';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    OrgLandingComponent,
    OrgTeamsViewComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    MenuModule,
    ButtonModule,
    BrowserAnimationsModule,
    RippleModule,
    TabViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
