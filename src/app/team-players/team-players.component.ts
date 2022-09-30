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
  data!: any;
  chartOptions!:any;
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
      MemberPhone:new FormControl(''),
      ImageUrl:new FormControl(''),
      PerformanceGood:new FormControl(''),
      PerformanceBad:new FormControl(''),
      PerformanceAverage:new FormControl('')  
      }); 
      this.chartOptions = this.getDarkTheme();

    this.route.params.subscribe(params=>{
      this.organizationId = params["orgId"];
      this.groupId = params["groupId"];
      this.teamPlayerId = params["teamPlayerId"];
      console.log("params",params);
      this.getCurrentTeamDetails(true);
    })
    // this.teamDetailsService.currentTeamDetails.subscribe(
    //   data => {
    //     this.teamDetails = data;
    //     if(this.teamPlayerId){
    //       data.Members.forEach((member,index)=>{
    //         if(member.MemberId==this.teamPlayerId){
    //           this.selectedIndex=index;
    //         }
    //       })
    //     }
    //   }
    // )
    console.log(':::orgDetails', this.teamDetails);
    // this.route.params.subscribe(params=>{
    //   this.organizationId = params["orgId"];
    //   this.getAllDetails();
    //   this.getOrganizationDetails();
    // })
   
  }

  getCurrentTeamDetails(isDefaultCall:boolean){
    this.teamDetailsService.getOrganizationDetails(this.groupId).subscribe(data=>{
        this.teamDetails = data;
        if(this.teamPlayerId){
          data.Members.forEach((member,i)=>{
            if(member.MemberId==this.teamPlayerId){
              this.selectedIndex=i;
              this.getPerformaceRatio({index: i})
            }
          })
        }
        else if (this.teamDetails.Members.length > 0) {
          this.getPerformaceRatio({ index: 0 });
        }
    })
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
      ImageUrl:'',
      PerformanceGood:'',
      PerformanceBad:'',
      PerformanceAverage:'', 
      OrganizationName: this.teamDetails.OrganizationName
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
      // ImageUrl:memberDetails.ImageUrl,
      PerformanceGood:memberDetails.PerformanceGood,
      PerformanceBad:memberDetails.PerformanceBad,
      PerformanceAverage:memberDetails.PerformanceAverage, 
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

  onPlayerAdd(data:boolean){
   this.teamDetailsService.getOrganizationDetails(this.groupId).subscribe(res=>{
    this.teamDetails = res;
    this.isAddTeamModalOpen = false;
   })
  }

  saveMemberDetails(){
    if(this.teamMemberForm.valid){
      let updatedDetails= this.teamMemberForm.value;
      this.memberDetails = updatedDetails;
   
      if(this.isEditGroupModalOpen){
        console.log()
        this.playerDetailsService.editTeam(this.memberDetails,this.organizationId).subscribe(res=>{
          // this.getAllDetails();
          this.getCurrentTeamDetails(false);
          this.isEditGroupModalOpen=false;
          // this.memberDetails = res;
        });
      }
    }
  }
  deleteGroup(){
    let memberId=this.teamMemberForm.value.MemberId;
      console.log(this.memberDetails);
      this.playerDetailsService.deleteTeam(this.organizationId,memberId).subscribe(res=>{
        this.getCurrentTeamDetails(false);
      });
      this.isDeleteGroupModalOpen=false;
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
  getPerformaceRatio(event: any): void {
    this.selectedIndex = event.index;
    let memberDetails = this.teamDetails.Members[this.selectedIndex];
    // console.log("Winratio:::" + winRatio);
    console.log("Winratio:::" + this.selectedIndex);

    this.data = {
      labels: ['Good Performance', 'Average Performance', 'Bad Performance'],
      datasets: [
        {
          data: [memberDetails.PerformanceGood, memberDetails.PerformanceAverage, memberDetails.PerformanceBad],
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D"
          ]
        }
      ]
    }
  }
}
