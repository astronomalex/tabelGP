import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormEditComponent } from './norm-edit.component';

describe('NormEditComponent', () => {
  let component: NormEditComponent;
  let fixture: ComponentFixture<NormEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
