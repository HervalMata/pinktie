import { Component, OnInit } from '@angular/core';
import {Product, ProductColor} from "../../../../model";
import {ActivatedRoute} from "@angular/router";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {ProductColorHttpService} from "../../../../services/http/product-color-http.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'product-color-list',
  templateUrl: './product-color-list.component.html',
  styleUrls: ['./product-color-list.component.css']
})
export class ProductColorListComponent implements OnInit {

  productId: number;
  product: Product = null;
  productColor: ProductColor = null;

  constructor(
    private route: ActivatedRoute,
    private productHttp: ProductHttpService,
    private productColorHttp: ProductColorHttpService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product;
      this.getProduct();
      this.getProductColor();
    })
  }

  getProduct() {
    this.productHttp.get(this.productId)
      .subscribe(product => this.product = product);
  }

  getProductColor() {
    this.productColorHttp.list(this.productId)
      .subscribe(productColor => {
        this.productColor = productColor;
        console.log(this.productColor);
      })
  }

  onInsertSuccess($event: any) {
    console.log($event);
    this.getProductColor();
  }

  onInsertError($event: HttpErrorResponse) {
    console.log($event);
    return false;
  }
}
