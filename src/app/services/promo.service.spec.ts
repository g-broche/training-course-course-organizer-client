import { TestBed } from '@angular/core/testing';

import { PromoService } from './promo.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('PromoService', () => {
  let service: PromoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PromoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
