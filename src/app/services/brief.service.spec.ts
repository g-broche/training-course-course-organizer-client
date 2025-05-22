import { TestBed } from '@angular/core/testing';

import { BriefService } from './brief.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BriefService', () => {
  let service: BriefService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(BriefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
