import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationEntitiesComponent } from './organization-entities.component';

describe('OrganizationEntitiesComponent', () => {
  let component: OrganizationEntitiesComponent;
  let fixture: ComponentFixture<OrganizationEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
