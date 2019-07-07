import { TestBed } from '@angular/core/testing';

import { QuickLinksService } from './quick-links.service';

describe('QuickLinksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuickLinksService = TestBed.get(QuickLinksService);
    expect(service).toBeTruthy();
  });
});
