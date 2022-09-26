import { Component, OnInit } from '@angular/core';
import { OrganizationDetailsService } from '../services/organization-details.service';
import {TeamDetailsService} from '../services/team-details.service'

@Component({
  selector: 'app-org-teams-view',
  templateUrl: './org-teams-view.component.html',
  styleUrls: ['./org-teams-view.component.scss']
})
export class OrgTeamsViewComponent implements OnInit {

  myOrganisationdata: any;
  organisationList: any;

  constructor(private orgDetailsService: OrganizationDetailsService, private teamDetailsService: TeamDetailsService) { }

  ngOnInit(): void {
    this.orgDetailsService.currentOrgDetails.subscribe(
      data => this.myOrganisationdata = data
    )
    console.log(':::orgDetails', this.myOrganisationdata);
    if(this.myOrganisationdata) {
      this.teamDetailsService.getOrganizationsList(this.myOrganisationdata.OrganizationId).subscribe(
        data => this.organisationList = data
      )
      console.log(this.organisationList);
    }
  }

}
