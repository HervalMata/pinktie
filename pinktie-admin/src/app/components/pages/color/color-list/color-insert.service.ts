import { Injectable } from '@angular/core';
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ColorListComponent} from "./color-list.component";

@Injectable({
  providedIn: 'root'
})
export class ColorInsertService {

  private _colorListComponent: ColorListComponent;

  constructor(private notifyMessage: NotifyMessageService) { }

  set colorListComponent(value: ColorListComponent) {
    this._colorListComponent = value;
  }

  showModalInsert() {
    this._colorListComponent.colorNewModal.showModal();
  }

  onInsertSuccess($event: any) {
    this.notifyMessage.success('Cor cadastrada com sucesso!');
    console.log($event);
    this._colorListComponent.getColors();
  }

  onInsertError($event: HttpErrorResponse) {
    this.notifyMessage.success('Não foi possível cadastrar a cor.');
    console.log($event);
  }
}
