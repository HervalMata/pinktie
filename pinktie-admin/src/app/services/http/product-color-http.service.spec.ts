import { TestBed } from '@angular/core/testing';

import { ProductColorHttpService } from './product-color-http.service';

describe('ProductColorHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductColorHttpService = TestBed.get(ProductColorHttpService);
    expect(service).toBeTruthy();
  });
});
