import { TestBed } from '@angular/core/testing';

import { ProductMaterialHttpService } from './product-material-http.service';

describe('ProductMaterialHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductMaterialHttpService = TestBed.get(ProductMaterialHttpService);
    expect(service).toBeTruthy();
  });
});
