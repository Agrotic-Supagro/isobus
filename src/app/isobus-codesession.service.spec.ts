import { TestBed } from '@angular/core/testing';

import { IsobusCodesessionService } from './isobus-codesession.service';

describe('IsobusCodesessionService', () => {
  let service: IsobusCodesessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsobusCodesessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
