import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkUnitListComponent } from './work-unit-list.component';

describe('WorkUnitListComponent', () => {
  let component: WorkUnitListComponent;
  let fixture: ComponentFixture<WorkUnitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkUnitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
