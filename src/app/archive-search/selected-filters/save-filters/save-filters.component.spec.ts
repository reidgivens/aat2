import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFiltersComponent } from './save-filters.component';

describe('SaveFiltersComponent', () => {
  let component: SaveFiltersComponent;
  let fixture: ComponentFixture<SaveFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
