import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrgDetails } from '../models/org-details.model';
import { OrganizationDetailsService } from '../services/organization-details.service';



@Component({
  selector: 'app-org-landing',
  templateUrl: './org-landing.component.html',
  styleUrls: ['./org-landing.component.scss']
})
export class OrgLandingComponent implements OnInit {

  allOrgs!: any;
  errorMessage!: string;
  isLoading!: boolean;
  orgDetails!: OrgDetails;


  constructor(private orgDetailsService: OrganizationDetailsService,    private router: Router,
    ) { 
  
  }

  ngOnInit(): void {
    this.orgDetailsService.getOrganizations().subscribe(
      {
        next: (res: any) => {
          this.allOrgs = res;
          console.log(this.allOrgs);
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err;
          console.log((this.errorMessage = err.message));
          this.isLoading = false;
        }
      }
    )
  }

  getTeamsByOrg(org:OrgDetails){
    // this.orgDetailsService.currentOrgDetails.next(org);
    this.router.navigate(['/orgTeams',org.OrganizationId]);

  }
}
