import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductHttpService} from "../../../../services/http/product-http.service";

@Component({
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

  form: FormGroup;
  errors: {};

  @Input()
  _productId: number;

  @ViewChild(ModalComponent) modal:ModalComponent;

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(
    private productHttp: ProductHttpService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      product_name: '',
      product_code: '',
      description: '',
      stock: 0,
      price: 0,
      category_id: null,
      active: true
    });
  }

  ngOnInit() {
  }

  submit() {
    this.productHttp.update(this._productId, this.form.value)
      .subscribe((product) => {
        this.onSuccess.emit(product);
        this.modal.hide();
      }, responseError => {
        if (responseError.status === 422) {
          this.errors = responseError.error.errors
        }
        this.onError.emit(responseError)
      });
  }

  @Input()
  set productId(value) {
    this._productId = value;
    if (this._productId) {
      this.productHttp.get(this._productId)
        .subscribe(product => this.form.patchValue(product),
          responseError => {
            if (responseError.status === 401) {
              this.modal.hide();
            }
          })
    }
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: Event) {
    console.log($event);
  }

  showErrors() {
    return Object.keys(this.errors).length != 0;
  }

}
