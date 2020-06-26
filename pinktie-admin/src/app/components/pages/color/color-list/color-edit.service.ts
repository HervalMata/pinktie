import { Injectable } from '@angular/core';
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ColorListComponent} from "./color-list.component";

@Injectable({
  providedIn: 'root'
})
export class ColorEditService {

  private _colorListComponent: ColorListComponent;

  constructor(private notifyMessage: NotifyMessageService) { }

  set colorListComponent(value: ColorListComponent) {
    this._colorListComponent = value;
  }

  showModalEdit(colorId: number) {
    this._colorListComponent.colorId = colorId;
    this._colorListComponent.colorEditModal.showModal();
  }

  onEditSuccess($event: any) {
    this.notifyMessage.success('Cor atualizada com sucesso!');
    console.log($event);
    this._colorListComponent.getColors();
  }

  onEditError($event: HttpErrorResponse) {
    this.notifyMessage.success('Não foi possível atualizar a cor.');
    console.log($event);
  }
}
