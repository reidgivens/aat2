import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectResultsComponent } from './project-results.component';

describe('ProjectResultsComponent', () => {
  let component: ProjectResultsComponent;
  let fixture: ComponentFixture<ProjectResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
