import { TestBed } from '@angular/core/testing';

import { HiWatchService } from './hi-watch.service';

describe('HiWatchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HiWatchService = TestBed.get(HiWatchService);
    expect(service).toBeTruthy();
  });
});
