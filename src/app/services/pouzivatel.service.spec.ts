import { TestBed } from '@angular/core/testing';

import { PouzivatelService } from './pouzivatel.service';

describe('PouzivatelService', () => {
  let service: PouzivatelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PouzivatelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
