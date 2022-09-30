import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MemberDetails } from '../models/member-details.model';
import { PlayerDetailsService } from '../services/player-details.service';
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {

  @Input() isAddTeamModalOpen!:boolean;
  @Input() teamDetails!:any;
  @Input() organizationId!:number;
  @Output() onPlayerAdd = new EventEmitter<boolean>()
  teamMemberForm!:FormGroup;
  memberDetails!:MemberDetails;
  constructor(private playerDetailsService:PlayerDetailsService) { }

  ngOnInit(): void {
    this.teamMemberForm = new FormGroup({
      MemberId: new FormControl(''),
      MemberName: new FormControl('',[Validators.required]),
      age: new FormControl(''),
      // SponsorName: new FormControl(''),
      MemberEmail: new FormControl('',[Validators.required,Validators.email]),
      OrganizationName:new FormControl(''),
      MemberPhone:new FormControl(''),
      ImageUrl: new FormControl(''),
      PerformanceGood:new FormControl(''),
      PerformanceBad:new FormControl(''),
      PerformanceAverage:new FormControl('') 
    }); 
  }

 
  hideAddTeamDialog(){
    this.teamMemberForm.patchValue({
      MemberId:'',
      MemberName:'',
      age: '',
      // SponsorName: '',
      MemberEmail: '',
      // OrganizationName:'',
      MemberPhone:'',
      OrganizationName: this.teamDetails.OrganizationName,
      ImageUrl: '',
      PerformanceGood:'',
      PerformanceBad:'',
      PerformanceAverage:''  
      // SponsorPhone:''
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
          this.onPlayerAdd.emit(true);
          this.hideAddTeamDialog();
        //   // this.getAllDetails();
        //   this.router.navigate(["/orgTeams",this.organizationId,"groups",this.groupId]);
        //   this.isAddTeamModalOpen=false;
        });
      }
    }
  }

}
