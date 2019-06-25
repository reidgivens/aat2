import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelescopesComponent } from './telescopes.component';

describe('TelescopesComponent', () => {
  let component: TelescopesComponent;
  let fixture: ComponentFixture<TelescopesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelescopesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
