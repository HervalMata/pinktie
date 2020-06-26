import { TestBed } from '@angular/core/testing';

import { ColorDeleteService } from './color-delete.service';

describe('ColorDeleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorDeleteService = TestBed.get(ColorDeleteService);
    expect(service).toBeTruthy();
  });
});
