import { TestBed } from '@angular/core/testing';

import { MaterialInsertService } from './material-insert.service';

describe('MaterialInsertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialInsertService = TestBed.get(MaterialInsertService);
    expect(service).toBeTruthy();
  });
});
