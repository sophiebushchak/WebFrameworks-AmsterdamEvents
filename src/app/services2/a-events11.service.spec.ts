import { TestBed } from '@angular/core/testing';

import { AEvents11Service } from './a-events11.service';

describe('AEvents11Service', () => {
  let service: AEvents11Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AEvents11Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
