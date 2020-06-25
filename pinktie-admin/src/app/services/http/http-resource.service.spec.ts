import { TestBed } from '@angular/core/testing';

import { HttpResourceService } from './http-resource.service';

describe('HttpResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpResourceService = TestBed.get(HttpResourceService);
    expect(service).toBeTruthy();
  });
});
