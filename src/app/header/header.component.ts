import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TeamDetailsService } from '../services/team-details.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchText:string="";
  isTeamDetailsPage=false;
  constructor( private teamDetailsService: TeamDetailsService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        let urls = val.url.split("/").filter(x=>x)
        if(urls.length==2 && urls[0]=="orgTeams"){
          this.isTeamDetailsPage=true;
        }else{
          this.isTeamDetailsPage=false;
        }
        console.log(val);
      }
  });
  }

  searchTeamMember(){
    console.log("test ", this.searchText);
    if(this.teamDetailsService.allTeamDetails && this.searchText){
      this.teamDetailsService.allTeamDetails.forEach((team:any) => {
        if(team.Members){
          team.Members.forEach((member:any) => {
            if(member.MemberName.toLowerCase()==this.searchText.toLowerCase()){
              this.searchText="";
              this.teamDetailsService.currentTeamDetails.next(team);
              this.router.navigate(["/orgTeams",this.teamDetailsService.selectedOrgId,"groups",team.GroupId,"player",member.MemberId]);
            }
          });
        }
      });
    }
  }

  homePage(){
    this.router.navigate(["/"]);
  }

}
