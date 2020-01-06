import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmenListComponent } from './smen-list.component';

describe('SmenListComponent', () => {
  let component: SmenListComponent;
  let fixture: ComponentFixture<SmenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
