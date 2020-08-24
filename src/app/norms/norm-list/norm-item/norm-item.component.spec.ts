import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormItemComponent } from './norm-item.component';

describe('NormItemComponent', () => {
  let component: NormItemComponent;
  let fixture: ComponentFixture<NormItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
