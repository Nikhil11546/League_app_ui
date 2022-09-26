import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgTeamsViewComponent } from './org-teams-view.component';

describe('OrgTeamsViewComponent', () => {
  let component: OrgTeamsViewComponent;
  let fixture: ComponentFixture<OrgTeamsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgTeamsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgTeamsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
