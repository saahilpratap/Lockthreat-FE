import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditEmployeesComponent } from './create-or-edit-employees.component';

describe('CreateOrEditEmployeesComponent', () => {
  let component: CreateOrEditEmployeesComponent;
  let fixture: ComponentFixture<CreateOrEditEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
