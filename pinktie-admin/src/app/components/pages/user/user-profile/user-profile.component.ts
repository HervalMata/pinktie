import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProfileHttpService} from "../../../../services/http/user-profile-http.service";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {AuthService} from "../../../../services/auth.service";
import fieldsOptions from "./user-profile-fields-options";

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  form: FormGroup;
  errors = {};
  has_photo: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userProfileHttp: UserProfileHttpService,
    private notifyMessage: NotifyMessageService,
    private authService: AuthService,
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.maxLength(fieldsOptions.name.validationMessage.maxlength)]],
      email: ['', [Validators.email, Validators.maxLength(fieldsOptions.emsil.validationMessage.maxlength)]],
      password: ['', [Validators.minLength(fieldsOptions.password.validationMessage.minlength), Validators.maxLength(fieldsOptions.password.validationMessage.maxlength)]],
      token: null,
      address: '',
      photo: false
    });
    this.form.patchValue(this.authService.me);
    this.setHasPhoto();
  }

  ngOnInit() {
  }

  get fieldsOptions() : any {
    return fieldsOptions;
  }

  submit() {
    const data = Object.assign({}, this.form.value);
    this.userProfileHttp.update(data)
      .subscribe((data) => {
        this.form.get('photo').setValue(false);
        this.form.get('token').setValue(null);
        this.setHasPhoto();
        this.notifyMessage.success('Perfil atualizado com sucesso!');
      },
        (responseError) => {
          if (responseError.status === 422) {
            this.errors = responseError.error.errors
          }
        });
    return false;
  }

  setHasPhoto() {
    this.has_photo = this.authService.me.profile.has_photo;
  }

  onChoosePhoto(files: FileList) {
    if (!files.length) {
      return;
    }
    this.form.get('photo').setValue(files[0]);
  }

  removePhoto() {
    this.form.get('photo').setValue(null);
    this.has_photo = false;
  }

  showErrors() {
    return Object.keys(this.errors).length != 0;
  }
}
