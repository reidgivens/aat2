import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationResultsComponent } from './observation-results.component';

describe('ObservationResultsComponent', () => {
  let component: ObservationResultsComponent;
  let fixture: ComponentFixture<ObservationResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
