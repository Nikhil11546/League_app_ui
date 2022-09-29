import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { OrgLandingComponent } from './org-landing/org-landing.component';
import { OrgTeamsViewComponent } from './org-teams-view/org-teams-view.component';
import { TeamPlayersComponent } from './team-players/team-players.component';

const fallbackRoute: Route = {path: '**', component: OrgLandingComponent}



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: OrgLandingComponent,
        // canActivate: [RegisterGuardService],
      },
      {
        path: 'orgDetails',
        component: OrgLandingComponent,
        // canActivate: [RegisterGuardService],
      },
      {
        path: 'orgTeams',
        children:[
          {
            path:":orgId",
            children:[
              {
                path:"",
                component: OrgTeamsViewComponent,
              },
              {
                path:"groups",
                children:[
                  {
                    path:":groupId",
                    children:[
                      {
                        path:"",
                        component: TeamPlayersComponent,
                      },
                      {
                        path:"player",
                        children:[
                          {
                            path:":teamPlayerId",
                            component: TeamPlayersComponent,
                          }
                        ]
                      }
                  ]
                  }
                ]
              }
            ]
          }
        ]
        // canActivate: [RegisterGuardService],
      },
      // {
      //   path: 'exercises',
      //   loadChildren: () =>
      //     import('./exercises/exercises.module').then(
      //       (mod) => mod.ExercisesModule
      //     ),
      // },
      fallbackRoute,
    ],
  },
];
// *ngFor="let goal of allGoals"
@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }


