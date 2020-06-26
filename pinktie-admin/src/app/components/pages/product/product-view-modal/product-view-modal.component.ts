import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Category, Product} from "../../../../model";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {ProductHttpService} from "../../../../services/http/product-http.service";

@Component({
  selector: 'product-view-modal',
  templateUrl: './product-view-modal.component.html',
  styleUrls: ['./product-view-modal.component.css']
})
export class ProductViewModalComponent implements OnInit {


  product: Product = {
    product_name: '',
    product_code: '',
    description: '',
    stock: 0,
    price: 0,
    active: true,
    // @ts-ignore
    category_id: null
  };

  @Input()
  _productId: number;

  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  constructor(private productHttp: ProductHttpService) { }

  ngOnInit() {
  }

  @Input()
  set productId(value) {
    this._productId = value;
    if (this._productId) {
      this.productHttp.get(this._productId)
        .subscribe(product => {
          this.product = product
        });
    }
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: Event) {
    console.log($event);
  }
}
