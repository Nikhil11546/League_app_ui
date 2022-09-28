import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrgDetails } from '../models/org-details.model';
import { Observable,BehaviorSubject } from 'rxjs';
import { TeamDetails } from '../models/team-details.model';

@Injectable({
  providedIn: 'root'
})
export class TeamDetailsService {



  apiURL= "http://127.0.0.1:8082/api/";
  getTeamsByOrgURL= "http://127.0.0.1:8082/api/groups/byorganization/";
  // addGroupsURL= "http://127.0.0.1:8082/api/groups/";
  constructor(private httpClient : HttpClient) { }

  getTeamsByGroupId(id: number): Observable<TeamDetails[]> {
    const results: Observable<TeamDetails[]> = this.httpClient.get<TeamDetails[]>(this.apiURL + "groups/byorganization" + id);
    console.log(`getOrganizations() returned ${results}`);
    return results;
  }
  getOrganizationDetails(id: number): Observable<TeamDetails> {
    const results: Observable<TeamDetails> = this.httpClient.get<TeamDetails>(this.apiURL + "groups/"+id);
    return results;
  }


  addGroup(groupDetails: TeamDetails){
    return this.httpClient.post<TeamDetails>(this.apiURL + "groups/", groupDetails);
  }

  editGroup(groupDetails: TeamDetails){
    return this.httpClient.put<TeamDetails>(this.apiURL + "groups/", groupDetails);
  }

  DeleteGroup(id: Number): void{
    console.log(id);
    this.httpClient.delete<TeamDetails>(this.apiURL + "groups/" + id).subscribe();
  }
  // getAllTeams()
  // {
    
  //   const results: Observable<TeamDetails> = this.httpClient.get<TeamDetails>(this.getTeamsByOrgURL);
  //   console.log(`getOrganizations() returned ${results}`);
  //   return results;
  // }
}
