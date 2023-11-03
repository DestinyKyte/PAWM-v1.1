import { TestBed } from '@angular/core/testing';

import { GenericErrorHandlerService } from './generic-error-handler.service';

describe('GenericErrorHandlerService', () => {
  let service: GenericErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
