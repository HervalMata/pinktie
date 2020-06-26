import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ColorHttpService} from "../../../../services/http/color-http.service";
import fieldsOptions from "../color-form/color-fields-options";

@Component({
  selector: 'color-new-modal',
  templateUrl: './color-new-modal.component.html',
  styleUrls: ['./color-new-modal.component.css']
})
export class ColorNewModalComponent implements OnInit {

  form: FormGroup;
  errors = {};

  @ViewChild(ModalComponent) modal:ModalComponent;

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(
    private colorHttp: ColorHttpService,
    private formBuilder: FormBuilder
  ) {
    const maxLength = fieldsOptions.color_name.validationMessage.maxlength;
    this.form = this.formBuilder.group({
      color_name: ['', Validators.required, Validators.maxLength(maxLength)],
      active: true
    });
  }

  ngOnInit() {
  }

  submit() {
    this.colorHttp.create(this.form.value)
      .subscribe((color) => {
        this.form.reset({
          color_name: '',
          active: true
        });
        this.onSuccess.emit(color);
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
