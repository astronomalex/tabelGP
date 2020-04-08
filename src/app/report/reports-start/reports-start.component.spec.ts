import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsStartComponent } from './reports-start.component';

describe('ReportsStartComponent', () => {
  let component: ReportsStartComponent;
  let fixture: ComponentFixture<ReportsStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
