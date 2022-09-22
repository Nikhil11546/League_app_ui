import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgLandingComponent } from './org-landing.component';

describe('OrgLandingComponent', () => {
  let component: OrgLandingComponent;
  let fixture: ComponentFixture<OrgLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
