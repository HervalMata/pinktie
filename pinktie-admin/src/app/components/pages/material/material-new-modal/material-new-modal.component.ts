import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {MaterialHttpService} from "../../../../services/http/material-http.service";
import fieldsOptions from "../material-form/material-fields-options";

@Component({
  selector: 'material-new-modal',
  templateUrl: './material-new-modal.component.html',
  styleUrls: ['./material-new-modal.component.css']
})
export class MaterialNewModalComponent implements OnInit {

  form: FormGroup;
  errors = {};

  @ViewChild(ModalComponent) modal:ModalComponent;

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(
    private materialHttp: MaterialHttpService,
    private formBuilder: FormBuilder
  ) {
    const maxLength = fieldsOptions.material_name.validationMessage.maxlength;
    this.form = this.formBuilder.group({
      material_name: ['', Validators.required, Validators.maxLength(maxLength)],
      active: true
    });
  }

  ngOnInit() {
  }

  submit() {
    this.materialHttp.create(this.form.value)
      .subscribe((material) => {
        this.form.reset({
          material_name: '',
          active: true
        });
        this.onSuccess.emit(material);
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
