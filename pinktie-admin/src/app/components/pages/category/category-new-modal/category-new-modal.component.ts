import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import fieldsOptions from "../category-form/category-fields-options";

@Component({
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent implements OnInit {

  form: FormGroup;
  errors = {};

  @ViewChild(ModalComponent) modal:ModalComponent;

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(
    private categoryHttp: CategoryHttpService,
    private formBuilder: FormBuilder
  ) {
    const maxLength = fieldsOptions.category_name.validationMessage.maxlength;
    this.form = this.formBuilder.group({
      category_name: ['', Validators.required, Validators.maxLength(maxLength)],
      active: true
    });
  }

  ngOnInit() {
  }

  submit() {
    this.categoryHttp.create(this.form.value)
      .subscribe((category) => {
        this.form.reset({
          category_name: '',
          active: true
        });
        this.onSuccess.emit(category);
        this.modal.hide();
      }, responseError => {
        if (responseError.status === 422) {
          this.errors = responseError.error.errors;
        }
        this.onError.emit(responseError)
      });
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
