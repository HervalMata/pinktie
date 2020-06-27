import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductColorNewModalComponent } from './product-color-new-modal.component';

describe('ProductColorNewModalComponent', () => {
  let component: ProductColorNewModalComponent;
  let fixture: ComponentFixture<ProductColorNewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductColorNewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductColorNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
