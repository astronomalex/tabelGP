import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormDetailComponent } from './norm-detail.component';

describe('NormDetailComponent', () => {
  let component: NormDetailComponent;
  let fixture: ComponentFixture<NormDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
