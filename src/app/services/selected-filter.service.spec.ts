import { TestBed } from '@angular/core/testing';

import { SelectedFilterService } from './selected-filter.service';

describe('SelectedFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectedFilterService = TestBed.get(SelectedFilterService);
    expect(service).toBeTruthy();
  });
});
