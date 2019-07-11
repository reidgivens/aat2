import { TestBed } from '@angular/core/testing';

import { WebAnalyticsService } from './web-analytics.service';

describe('WebAnalyticsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebAnalyticsService = TestBed.get(WebAnalyticsService);
    expect(service).toBeTruthy();
  });
});
