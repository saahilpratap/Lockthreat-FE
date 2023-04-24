import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditBusinessUnitComponent } from './create-or-edit.component';

describe('CreateOrEditComponent', () => {
    let component: CreateOrEditBusinessUnitComponent;
    let fixture: ComponentFixture<CreateOrEditBusinessUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [CreateOrEditBusinessUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(CreateOrEditBusinessUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
