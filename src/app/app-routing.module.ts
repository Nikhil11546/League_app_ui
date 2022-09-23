import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { OrgLandingComponent } from './org-landing/org-landing.component';

const fallbackRoute: Route = {path: '**', component: OrgLandingComponent}
const routes: Routes = [
  // {path:''}
];

// *ngFor="let goal of allGoals"
@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }


