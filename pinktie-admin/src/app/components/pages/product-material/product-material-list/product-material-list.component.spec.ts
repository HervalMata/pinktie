import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMaterialListComponent } from './product-material-list.component';

describe('ProductMaterialListComponent', () => {
  let component: ProductMaterialListComponent;
  let fixture: ComponentFixture<ProductMaterialListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMaterialListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMaterialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
