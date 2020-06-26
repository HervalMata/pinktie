import { TestBed } from '@angular/core/testing';

import { ColorHttpService } from './color-http.service';

describe('ColorHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorHttpService = TestBed.get(ColorHttpService);
    expect(service).toBeTruthy();
  });
});
