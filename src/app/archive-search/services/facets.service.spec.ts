import { TestBed } from '@angular/core/testing';

import { FacetsService } from './facets.service';

describe('FacetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacetsService = TestBed.get(FacetsService);
    expect(service).toBeTruthy();
  });
});
