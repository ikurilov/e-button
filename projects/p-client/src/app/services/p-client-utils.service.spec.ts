import { TestBed } from '@angular/core/testing';

import { PClientUtilsService } from './p-client-utils.service';

describe('PClientUtilsService', () => {
  let service: PClientUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PClientUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
