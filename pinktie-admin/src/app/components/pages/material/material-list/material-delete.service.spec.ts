import { TestBed } from '@angular/core/testing';

import { MaterialDeleteService } from './material-delete.service';

describe('MaterialDeleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialDeleteService = TestBed.get(MaterialDeleteService);
    expect(service).toBeTruthy();
  });
});
