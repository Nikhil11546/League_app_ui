import { Component, OnInit } from '@angular/core';
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
  activeGoal!: OrgDetails;

  constructor(private orgDetailsService: OrganizationDetailsService) { }

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

}
