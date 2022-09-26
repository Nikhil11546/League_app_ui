import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrgDetails } from '../models/org-details.model';
import { TeamDetails } from '../models/team-details.model';
import { OrganizationDetailsService } from '../services/organization-details.service';
import {TeamDetailsService} from '../services/team-details.service'
import { FormGroup, FormControl } from '@angular/forms';
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
  isAddTeamModalOpen:boolean = false;
  isEditGroupModalOpen:boolean = false;
  groupForm!:FormGroup;
  constructor(private orgDetailsService: OrganizationDetailsService, private teamDetailsService: TeamDetailsService,private router:Router) { }

  ngOnInit(): void {
    this.groupForm = new FormGroup({
      groupName: new FormControl(''),
      maxGroupSize: new FormControl(''),
    });
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

  openAddPlayerDialog(){
    this.isAddTeamModalOpen=true;
  }
  navigateToViewAllPlayers(){
    this.router.navigate(["/total-players"])
  }
  openEditGroupDetailsPopUp(groupDetails:TeamDetails){
    this.isEditGroupModalOpen=true;
    this.groupForm.patchValue({
      groupName:groupDetails.GroupName,
      maxGroupSize:groupDetails.MaxGroupSize,
    });
  }
  saveGroupDetails(){
    let updatedDetails= this.groupForm.value
    console.log(updatedDetails);
  }
}
