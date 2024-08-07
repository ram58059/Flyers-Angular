import { TestBed } from '@angular/core/testing';

import { CommdbutilityService } from './commdbutility.service';

describe('CommdbutilityService', () => {
  let service: CommdbutilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommdbutilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
