import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMaterialNewModalComponent } from './product-material-new-modal.component';

describe('ProductMaterialNewModalComponent', () => {
  let component: ProductMaterialNewModalComponent;
  let fixture: ComponentFixture<ProductMaterialNewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMaterialNewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMaterialNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
