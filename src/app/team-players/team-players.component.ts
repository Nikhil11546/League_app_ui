import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamDetailsService } from '../services/team-details.service';
import { TeamDetails } from '../models/team-details.model';
import { MemberDetails } from '../models/member-details.model';
import { PlayerDetailsService } from '../services/player-details.service';


@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.scss']
})
export class TeamPlayersComponent implements OnInit {

  teamMemberForm!:FormGroup;
  teamDetails!:any;
  memberDetails!:MemberDetails;
  isAddTeamModalOpen:boolean = false;
  isEditGroupModalOpen:boolean = false;
  isDeleteGroupModalOpen:boolean = false;
  organizationId!:number;
  groupId!:number;
  teamPlayerId!:number;

  selectedIndex=0;




  constructor(private teamDetailsService:TeamDetailsService,private playerDetailsService:PlayerDetailsService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.teamMemberForm = new FormGroup({
      MemberId: new FormControl(''),
      MemberName: new FormControl('',[Validators.required]),
      age: new FormControl(''),
      // SponsorName: new FormControl(''),
      MemberEmail: new FormControl('',[Validators.required,Validators.email]),
      // OrganizationName:new FormControl(''),
      MemberPhone:new FormControl('')
    }); 
    this.route.params.subscribe(params=>{
      this.organizationId = params["orgId"];
      this.groupId = params["groupId"];
      this.teamPlayerId = params["teamPlayerId"];
      console.log("params",params);
    })
    this.teamDetailsService.currentTeamDetails.subscribe(
      data => {
        this.teamDetails = data;
        if(this.teamPlayerId){
          data.Members.forEach((member,index)=>{
            if(member.MemberId==this.teamPlayerId){
              this.selectedIndex=index;
            }
          })
        }
      }
    )
    console.log(':::orgDetails', this.teamDetails);
    // this.route.params.subscribe(params=>{
    //   this.organizationId = params["orgId"];
    //   this.getAllDetails();
    //   this.getOrganizationDetails();
    // })
   
  }

  openAddPlayerDialog(){
    this.isAddTeamModalOpen=true;
    this.teamMemberForm.reset();
    this.teamMemberForm.patchValue({
      MemberId:'',
      MemberName:'',
      age: '',
      // SponsorName: '',
      MemberEmail: '',
      // OrganizationName:'',
      MemberPhone:'',
      OrganizationName: this.teamDetails.OrganizationName,
      // SponsorPhone:''
    });

  }

  openEditGroupDetailsPopUp(memberDetails:MemberDetails){
    this.isEditGroupModalOpen=true;
    this.teamMemberForm.patchValue({
      MemberId:memberDetails.MemberId,
      MemberName:memberDetails.MemberName,
      // MaxGroupSize:memberDetails.MaxGroupSize,
      // SponsorName: memberDetails.SponsorName,
      MemberEmail: memberDetails.MemberEmail,
      MemberPhone: memberDetails.MemberPhone,
      age: memberDetails.age,

      OrganizationName: this.teamDetails.OrganizationName
    });
  }

  openDeleteGroupDetailsPopUp(memberDetails: MemberDetails){
    this.isDeleteGroupModalOpen=true;
    this.teamMemberForm.patchValue({
      MemberId:memberDetails.MemberId,
      MemberName:memberDetails.MemberName
    });

  }

  saveMemberDetails(){
    if(this.teamMemberForm.valid){
      let updatedDetails= this.teamMemberForm.value;
      this.memberDetails = updatedDetails;
  
      console.log(updatedDetails);
      console.log(this.memberDetails);
  
      if(this.isAddTeamModalOpen){
        this.playerDetailsService.addTeam(this.memberDetails,this.organizationId).subscribe(res=>{
          // this.getAllDetails();
          this.router.navigate(["/orgTeams",this.organizationId,"groups",this.groupId]);
          this.isAddTeamModalOpen=false;
        });
      }
  
      if(this.isEditGroupModalOpen){
        console.log()
        this.playerDetailsService.editTeam(this.memberDetails,this.organizationId).subscribe(res=>{
          // this.getAllDetails();
          this.isEditGroupModalOpen=false;
          // this.memberDetails = res;
        });
      }
    }
  }
  deleteGroup(){
    let memberId=this.teamMemberForm.value.MemberId;
      console.log(this.memberDetails);
      this.playerDetailsService.deleteTeam(this.organizationId,memberId);
      this.isDeleteGroupModalOpen=false;
  }
}
