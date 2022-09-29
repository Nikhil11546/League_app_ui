import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgDetails } from '../models/org-details.model';
import { TeamDetails } from '../models/team-details.model';
import { OrganizationDetailsService } from '../services/organization-details.service';
import {TeamDetailsService} from '../services/team-details.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-org-teams-view',
  templateUrl: './org-teams-view.component.html',
  styleUrls: ['./org-teams-view.component.scss']
})
export class OrgTeamsViewComponent implements OnInit {
  

  allTeams!: any;
  data!: any;
  myOrganisationdata!: TeamDetails;
  organizationId!: number;
  isLoading!: boolean;
  chartOptions: any;
  memberDetailsList!: TeamDetails;
  errorMessage!: string;
  isAddTeamModalOpen:boolean = false;
  isEditGroupModalOpen:boolean = false;
  isDeleteGroupModalOpen:boolean = false;
  groupForm!:FormGroup;
  selectedIndex:number=0;

  constructor(private orgDetailsService: OrganizationDetailsService, private teamDetailsService: TeamDetailsService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.groupForm = new FormGroup({
      GroupId: new FormControl(''),
      GroupName: new FormControl('',[Validators.required]),
      MaxGroupSize: new FormControl(''),
      SponsorName: new FormControl(''),
      SponsorEmail: new FormControl('',[Validators.required,Validators.email]),
      OrganizationName:new FormControl(''),
      SponsorPhone:new FormControl(''),
      WinsRatio:new FormControl('')
    });
    // this.orgDetailsService.currentOrgDetails.subscribe(
    //   data => this.myOrganisationdata = data
    // )
    this.chartOptions=this.getDarkTheme();
  //   this.data = {
  //     labels: ['Win Percentage', 'Lose Percentage'],
  //     datasets: [
  //         {
  //             data: [70, 100 - 70],
  //             backgroundColor: [
  //                 "#42A5F5",
  //                 "#66BB6A",
  //             ],
  //             hoverBackgroundColor: [
  //                 "#64B5F6",
  //                 "#81C784",
  //             ]
  //         }
  //     ]
  // }
    console.log(':::orgDetails', this.myOrganisationdata);
    this.route.params.subscribe(params=>{
      this.organizationId = params["orgId"];
      this.getAllDetails();
      this.getOrganizationDetails();
    })
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

  getAllDetails(){
    this.teamDetailsService.getTeamsByGroupId(this.organizationId).subscribe(
      {
        next: (res: any) => {
          this.allTeams = res;
          if(this.allTeams.length>0){
            this.getWinRatio({index:0});
          }
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
  }
  getOrganizationDetails(){
    this.teamDetailsService.getOrganizationDetails(this.organizationId).subscribe(
      {
        next: (res: any) => {
         this.myOrganisationdata = res;
        },
        error: (err) => {
          this.errorMessage = err;
          console.log((this.errorMessage = err.message));
          this.isLoading = false;
        }
      }
    )
  }

  openAddPlayerDialog(){
    this.isAddTeamModalOpen=true;
    this.groupForm.reset();
    this.groupForm.patchValue({
      GroupId: '',
      GroupName: '',
      MaxGroupSize: '',
      SponsorName: '',
      SponsorEmail: '',
      WinsRatio: 0,
      OrganizationName: this.myOrganisationdata.OrganizationName,
      SponsorPhone:''
    });

  }
  navigateToViewAllPlayers(teamDetails:TeamDetails){
    this.teamDetailsService.currentTeamDetails.next(teamDetails);
    this.router.navigate(["/orgTeams",this.organizationId,"total-players",teamDetails.GroupId]);
  }
  openEditGroupDetailsPopUp(groupDetails:TeamDetails){
    this.isEditGroupModalOpen=true;
    this.groupForm.patchValue({
      GroupId:groupDetails.GroupId,
      GroupName:groupDetails.GroupName,
      MaxGroupSize:groupDetails.MaxGroupSize,
      SponsorName: groupDetails.SponsorName,
      SponsorEmail: groupDetails.SponsorEmail,
      SponsorPhone: groupDetails.SponsorPhone,
      OrganizationName: this.myOrganisationdata.OrganizationName
    });
  }

  openDeleteGroupDetailsPopUp(groupDetails: TeamDetails){
    this.isDeleteGroupModalOpen=true;
    this.groupForm.patchValue({
      GroupName:groupDetails.GroupName,
      GroupId:groupDetails.GroupId,

     
    });

  }
  saveGroupDetails(){
    if(this.groupForm.valid){
      let updatedDetails= this.groupForm.value;
      this.memberDetailsList = updatedDetails;
  
      console.log(updatedDetails);
      console.log(this.memberDetailsList);
  
      if(this.isAddTeamModalOpen){
        this.teamDetailsService.addGroup(this.memberDetailsList).subscribe(res=>{
          this.getAllDetails();
          this.isAddTeamModalOpen=false;
        });
      }
  
      if(this.isEditGroupModalOpen){
        this.teamDetailsService.editGroup(this.memberDetailsList).subscribe(res=>{
          this.getAllDetails();
          this.isEditGroupModalOpen=false;
        });
      }
    }
  }
  deleteGroup(){
      console.log(this.memberDetailsList.GroupId)
      this.teamDetailsService.DeleteGroup(this.memberDetailsList.GroupId);
  }

  getDarkTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        }
    }
}
  getWinRatio(event: any): void{
    this.selectedIndex=event.index;
    let winRatio= this.allTeams[this.selectedIndex].WinsRatio
    console.log("Winratio:::"+winRatio);

    this.data={
    labels: ['Win Percentage','Lose Percentage'],
    datasets: [
      {
     data:[winRatio, 100-winRatio],
     backgroundColor: [
      "#42A5F5",
      "#66BB6A",
  ],
  hoverBackgroundColor: [
      "#64B5F6",
      "#81C784",
  ]
    } 
    ]
  }
}
}
