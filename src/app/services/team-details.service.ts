import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrgDetails } from '../models/org-details.model';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamDetailsService {


  getTeamsByOrgURL= "http://127.0.0.1:8082/api/groups/";
  constructor(private httpClient : HttpClient) { }

  getOrganizationsList(id: number): Observable<OrgDetails> {
    const results: Observable<OrgDetails> = this.httpClient.get<OrgDetails>(this.getTeamsByOrgURL + id);
    console.log(`getOrganizations() returned ${results}`);
    return results;
  }
}
