import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { OrgLandingComponent } from './org-landing/org-landing.component';

const fallbackRoute: Route = {path: '**', component: OrgLandingComponent}
const routes: Routes = [
  // {path:''}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


