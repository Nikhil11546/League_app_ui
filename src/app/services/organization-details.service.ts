import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrgDetails } from '../models/org-details.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrganizationDetailsService {

  getOrganizationUrl = 'http://localhost:8082/api/organizations';

  // jsonContentTypeHeaders = {
  //   headers: new HttpHeaders().set('Content-Type', 'application/json'),
  // }

  constructor(private httpClient : HttpClient) { }

  getOrganizations(): Observable<OrgDetails> {
    const results: Observable<OrgDetails> = this.httpClient.get<OrgDetails>(this.getOrganizationUrl);
    console.log(`getOrganizations() returned ${results}`);
    return results;
  }




}
