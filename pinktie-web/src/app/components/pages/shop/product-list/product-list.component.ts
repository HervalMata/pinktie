import { Component, OnInit } from '@angular/core';
import {ShopHttpService} from "../../../../services/http/shop-http.service";
import {Product} from "../../../../model";

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Array<Product> = [];
  products1: Array<Product> = [];
  products2: Array<Product> = [];

  constructor(
    private shopHttp: ShopHttpService
  ) { }

  ngOnInit() {
    this.getProducts();
    this.getProducts1();
    this.getProducts2();
  }

  getProducts() {
    return this.shopHttp.list()
      .subscribe(response => {
        console.log(response.data);
        this.products = response.data;
      })
  }

  getProducts1() {
    return this.shopHttp.list1()
      .subscribe(response => {
        console.log(response.data);
        this.products1 = response.data;
      })
  }

  getProducts2() {
    return this.shopHttp.list2()
      .subscribe(response => {
        console.log(response.data);
        this.products2 = response.data;
      })
  }
}
