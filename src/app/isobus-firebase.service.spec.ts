import { TestBed } from '@angular/core/testing';

import { IsobusFirebaseService } from './isobus-firebase.service';

describe('IsobusFirebaseService', () => {
  let service: IsobusFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsobusFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
