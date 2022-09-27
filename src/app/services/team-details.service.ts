import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrgDetails } from '../models/org-details.model';
import { Observable,BehaviorSubject } from 'rxjs';
import { TeamDetails } from '../models/team-details.model';

@Injectable({
  providedIn: 'root'
})
export class TeamDetailsService {



  getTeamsByOrgURL= "http://127.0.0.1:8082/api/groups/byorganization/";
  addGroupsURL= "http://127.0.0.1:8082/api/groups/";
  constructor(private httpClient : HttpClient) { }

  getTeamsByGroupId(id: number): Observable<TeamDetails[]> {
    const results: Observable<TeamDetails[]> = this.httpClient.get<TeamDetails[]>(this.getTeamsByOrgURL + id);
    console.log(`getOrganizations() returned ${results}`);
    return results;
  }


  addGroup(groupDetails: TeamDetails): void{
    this.httpClient.post<TeamDetails>(`http://127.0.0.1:8082/api/groups/`, groupDetails).subscribe();
  }

  editGroup(groupDetails: TeamDetails): void{
    this.httpClient.put<TeamDetails>(`http://127.0.0.1:8082/api/groups/`, groupDetails).subscribe();
  }

  DeleteGroup(id: Number): void{
    console.log(id);
    this.httpClient.delete<TeamDetails>(this.addGroupsURL + id).subscribe();
  }
  // getAllTeams()
  // {
    
  //   const results: Observable<TeamDetails> = this.httpClient.get<TeamDetails>(this.getTeamsByOrgURL);
  //   console.log(`getOrganizations() returned ${results}`);
  //   return results;
  // }
}
