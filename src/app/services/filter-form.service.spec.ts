import { TestBed } from '@angular/core/testing';

import { FilterFormService } from './filter-form.service';

describe('FilterFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterFormService = TestBed.get(FilterFormService);
    expect(service).toBeTruthy();
  });
});
