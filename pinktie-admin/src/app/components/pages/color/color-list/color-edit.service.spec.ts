import { TestBed } from '@angular/core/testing';

import { ColorEditService } from './color-edit.service';

describe('ColorEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorEditService = TestBed.get(ColorEditService);
    expect(service).toBeTruthy();
  });
});
