import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {UserHttpService} from "../../../../services/http/user-http.service";

@Component({
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {

  form: FormGroup;
  errors: {};

  @Input()
  _userId: number;

  @ViewChild(ModalComponent) modal:ModalComponent;

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(
    private userHttp: UserHttpService,
    private formBuilder: FormBuilder
  ) {
    //const maxLength = fieldsOptions.user_name.validationMessage.maxlength;
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  submit() {
    this.userHttp.update(this._userId, this.form.value)
      .subscribe((user) => {
        this.onSuccess.emit(user);
        this.modal.hide();
      }, responseError => {
        if (responseError.status === 422) {
          this.errors = responseError.error.errors
        }
        this.onError.emit(responseError)
      });
  }

  @Input()
  set userId(value) {
    this._userId = value;
    if (this._userId) {
      this.userHttp.get(this._userId)
        .subscribe(user => this.form.patchValue(user),
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
