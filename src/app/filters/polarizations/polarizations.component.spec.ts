import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarizationsComponent } from './polarizations.component';

describe('PolarizationsComponent', () => {
  let component: PolarizationsComponent;
  let fixture: ComponentFixture<PolarizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolarizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
