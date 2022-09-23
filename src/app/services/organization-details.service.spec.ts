import { TestBed } from '@angular/core/testing';

import { OrganizationDetailsService } from './organization-details.service';

describe('OrganizationDetailsService', () => {
  let service: OrganizationDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
