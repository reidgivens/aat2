import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcePositionComponent } from './source-position.component';

describe('SourcePositionComponent', () => {
  let component: SourcePositionComponent;
  let fixture: ComponentFixture<SourcePositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcePositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
