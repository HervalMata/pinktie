import { TestBed } from '@angular/core/testing';

import { ShopHttpService } from './shop-http.service';

describe('ShopHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopHttpService = TestBed.get(ShopHttpService);
    expect(service).toBeTruthy();
  });
});
