import { TestBed } from '@angular/core/testing';

import { RemoteSocketServiceService } from './remote-socket-service.service';

describe('RemoteSocketServiceService', () => {
  let service: RemoteSocketServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteSocketServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
