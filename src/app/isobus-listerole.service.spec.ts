import { TestBed } from '@angular/core/testing';

import { IsobusListeroleService } from './isobus-listerole.service';

describe('IsobusListeroleService', () => {
  let service: IsobusListeroleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsobusListeroleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
