import { TestBed } from '@angular/core/testing';

import { AutoRefreshService } from './auto-refresh.service';

describe('AutoRefreshService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoRefreshService = TestBed.get(AutoRefreshService);
    expect(service).toBeTruthy();
  });
});
