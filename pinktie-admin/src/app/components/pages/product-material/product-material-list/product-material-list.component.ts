import { Component, OnInit } from '@angular/core';
import {Product, ProductMaterial} from "../../../../model";
import {ActivatedRoute} from "@angular/router";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductMaterialHttpService} from "../../../../services/http/product-material-http.service";

@Component({
  selector: 'product-material-list',
  templateUrl: './product-material-list.component.html',
  styleUrls: ['./product-material-list.component.css']
})
export class ProductMaterialListComponent implements OnInit {

  productId: number;
  product: Product = null;
  productMaterial: ProductMaterial = null;

  constructor(
    private route: ActivatedRoute,
    private productHttp: ProductHttpService,
    private productMaterialHttp: ProductMaterialHttpService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product;
      this.getProduct();
      this.getProductMaterial();
    })
  }

  getProduct() {
    this.productHttp.get(this.productId)
      .subscribe(product => this.product = product);
  }

  getProductMaterial() {
    this.productMaterialHttp.list(this.productId)
      .subscribe(productMaterial => {
        this.productMaterial = productMaterial;
        console.log(this.productMaterial);
      })
  }

  onInsertSuccess($event: any) {
    console.log($event);
    this.getProductMaterial();
  }

  onInsertError($event: HttpErrorResponse) {
    console.log($event);
    return false;
  }

}
