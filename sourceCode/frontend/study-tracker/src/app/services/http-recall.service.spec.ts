import { TestBed } from '@angular/core/testing';

import { HttpRecallService } from './http-recall.service';

describe('HttpRecallService', () => {
  let service: HttpRecallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRecallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
