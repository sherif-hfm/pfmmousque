import { TestBed } from '@angular/core/testing';

import { ArabicNumsService } from './arabic-nums.service';

describe('ArabicNumsService', () => {
  let service: ArabicNumsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArabicNumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
