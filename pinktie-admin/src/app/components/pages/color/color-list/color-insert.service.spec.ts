import { TestBed } from '@angular/core/testing';

import { ColorInsertService } from './color-insert.service';

describe('ColorInsertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorInsertService = TestBed.get(ColorInsertService);
    expect(service).toBeTruthy();
  });
});
