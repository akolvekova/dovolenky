import { TestBed } from '@angular/core/testing';

import { SviatokService } from './sviatok.service';

describe('SviatokService', () => {
  let service: SviatokService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SviatokService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
