import { TestBed } from '@angular/core/testing';

import { BriefService } from './brief.service';

describe('BriefService', () => {
  let service: BriefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BriefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
