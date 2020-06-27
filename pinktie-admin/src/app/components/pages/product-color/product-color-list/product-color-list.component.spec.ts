import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductColorListComponent } from './product-color-list.component';

describe('ProductColorListComponent', () => {
  let component: ProductColorListComponent;
  let fixture: ComponentFixture<ProductColorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductColorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductColorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
