import { TestBed } from '@angular/core/testing';

import { ResultTypeService } from './result-type.service';

describe('ResultTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResultTypeService = TestBed.get(ResultTypeService);
    expect(service).toBeTruthy();
  });
});
