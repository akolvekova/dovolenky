import { TestBed } from '@angular/core/testing';

import { DovolenkyService } from './dovolenky.service';

describe('DovolenkyService', () => {
  let service: DovolenkyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DovolenkyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
