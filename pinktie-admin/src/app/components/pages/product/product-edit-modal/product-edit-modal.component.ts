import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import fieldsOptions from "../product-form/product-fields-options";

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
    const maxLength = fieldsOptions.product_name.validationMessage.maxlength;
    const minStock = fieldsOptions.stock.validationMessage.min;
    const minPrice = fieldsOptions.stock.validationMessage.min;
    this.form = this.formBuilder.group({
      product_name: ['', [Validators.required, Validators.maxLength(maxLength)]],
      product_code: ['', [Validators.required]],
      description: ['', [Validators.required]],
      stock: [0, [Validators.required, Validators.min(minStock)]],
      price: [0, [Validators.required, Validators.min(minPrice)]],
      category_id: ['', Validators.required],
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
