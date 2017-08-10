/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UberProposalsService } from './uber-proposals.service';

describe('UberProposalsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UberProposalsService]
    });
  });

  it('should ...', inject([UberProposalsService], (service: UberProposalsService) => {
    expect(service).toBeTruthy();
  }));
});
