import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFiltersComponent } from './load-filters.component';

describe('LoadFiltersComponent', () => {
  let component: LoadFiltersComponent;
  let fixture: ComponentFixture<LoadFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
