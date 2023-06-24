import { TestBed } from '@angular/core/testing';

import { UmalquraCalendarService } from './umalqura-calendar.service';

describe('UmalquraCalendarService', () => {
  let service: UmalquraCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UmalquraCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
