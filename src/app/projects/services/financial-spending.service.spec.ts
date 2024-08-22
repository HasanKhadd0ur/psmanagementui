import { TestBed } from '@angular/core/testing';

import { FinancialSpendingService } from './financial-spending.service';

describe('FinancialSpendingService', () => {
  let service: FinancialSpendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialSpendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
