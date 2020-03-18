import { TestBed } from '@angular/core/testing';

import { AEvents2Service } from './a-events2.service';

describe('AEvents2Service', () => {
  let service: AEvents2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AEvents2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
