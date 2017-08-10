/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CoordinatorService } from './coordinator.service';

describe('CoordinatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoordinatorService]
    });
  });

  it('should ...', inject([CoordinatorService], (service: CoordinatorService) => {
    expect(service).toBeTruthy();
  }));
});
