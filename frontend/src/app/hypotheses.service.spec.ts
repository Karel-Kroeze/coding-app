import { TestBed, inject } from '@angular/core/testing';

import { HypothesesService } from './hypotheses.service';

describe('HypothesesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HypothesesService]
    });
  });

  it('should ...', inject([HypothesesService], (service: HypothesesService) => {
    expect(service).toBeTruthy();
  }));
});
