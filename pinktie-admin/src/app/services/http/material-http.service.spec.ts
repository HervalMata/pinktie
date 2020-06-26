import { TestBed } from '@angular/core/testing';

import { MaterialHttpService } from './material-http.service';

describe('MaterialHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialHttpService = TestBed.get(MaterialHttpService);
    expect(service).toBeTruthy();
  });
});
