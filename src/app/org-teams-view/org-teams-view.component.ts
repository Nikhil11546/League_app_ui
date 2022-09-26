import { Component, OnInit } from '@angular/core';
import { OrgDetails } from '../models/org-details.model';
import { TeamDetails } from '../models/team-details.model';
import { OrganizationDetailsService } from '../services/organization-details.service';
import {TeamDetailsService} from '../services/team-details.service'

@Component({
  selector: 'app-org-teams-view',
  templateUrl: './org-teams-view.component.html',
  styleUrls: ['./org-teams-view.component.scss']
})
export class OrgTeamsViewComponent implements OnInit {
  

  allTeams!: any;
  myOrganisationdata!: OrgDetails;
  isLoading!: boolean;
  memberDetailsList!: TeamDetails[];
  errorMessage!: string;


  constructor(private orgDetailsService: OrganizationDetailsService, private teamDetailsService: TeamDetailsService) { }

  ngOnInit(): void {
    this.orgDetailsService.currentOrgDetails.subscribe(
      data => this.myOrganisationdata = data
    )
    console.log(':::orgDetails', this.myOrganisationdata);
    this.teamDetailsService.getTeamsByGroupId(this.myOrganisationdata.OrganizationId).subscribe(
      {
        next: (res: any) => {
          this.allTeams = res;
          console.log(this.allTeams);
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err;
          console.log((this.errorMessage = err.message));
          this.isLoading = false;
        }
      }
    )
    // if(this.myOrganisationdata) {
    //   this.teamDetailsService.getTeamsByGroupId(this.myOrganisationdata.OrganizationId).subscribe(
    //    data => {
    //     console.log(data);
    //     this.memberDetailsList = data;
    //    }
    
    //   )
    //   console.log(this.memberDetailsList.GroupName);
    // }
  }

}
