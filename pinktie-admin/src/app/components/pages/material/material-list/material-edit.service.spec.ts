import { TestBed } from '@angular/core/testing';

import { MaterialEditService } from './material-edit.service';

describe('MaterialEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialEditService = TestBed.get(MaterialEditService);
    expect(service).toBeTruthy();
  });
});
