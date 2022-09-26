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
  constructor(private httpClient : HttpClient) { }

  getTeamsByGroupId(id: number): Observable<TeamDetails[]> {
    const results: Observable<TeamDetails[]> = this.httpClient.get<TeamDetails[]>(this.getTeamsByOrgURL + id);
    console.log(`getOrganizations() returned ${results}`);
    return results;
  }

  // getAllTeams()
  // {
    
  //   const results: Observable<TeamDetails> = this.httpClient.get<TeamDetails>(this.getTeamsByOrgURL);
  //   console.log(`getOrganizations() returned ${results}`);
  //   return results;
  // }
}
