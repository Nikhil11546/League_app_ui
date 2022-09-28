import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberDetails } from '../models/member-details.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerDetailsService {


  apiURL= "http://127.0.0.1:8082/api/";

  constructor(private httpClient : HttpClient) { }

  addTeam(memberDetails: MemberDetails, orgId: number){
    return this.httpClient.post<MemberDetails>(this.apiURL + "groups/"+orgId+"/members",memberDetails);
  }

  editTeam(memberDetails: MemberDetails, orgId: number){
    return this.httpClient.put<MemberDetails>(this.apiURL + "groups/"+orgId+"/members", memberDetails);
  }

  deleteTeam(orgId: number,memberId: number): void{
    // console.log(id);
    this.httpClient.delete<MemberDetails>(this.apiURL + "groups/" + orgId+"/members/"+memberId).subscribe();
  }
}
