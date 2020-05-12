import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkUnitItemComponent } from './work-unit-item.component';

describe('WorkUnitItemComponent', () => {
  let component: WorkUnitItemComponent;
  let fixture: ComponentFixture<WorkUnitItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkUnitItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkUnitItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
