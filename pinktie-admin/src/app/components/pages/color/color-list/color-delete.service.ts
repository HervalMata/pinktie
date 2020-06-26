import { Injectable } from '@angular/core';
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ColorListComponent} from "./color-list.component";

@Injectable({
  providedIn: 'root'
})
export class ColorDeleteService {

  private _colorListComponent: ColorListComponent;

  constructor(private notifyMessage: NotifyMessageService) { }

  set colorListComponent(value: ColorListComponent) {
    this._colorListComponent = value;
  }

  showModalDelete(colorId: number) {
    this._colorListComponent.colorId = colorId;
    this._colorListComponent.colorDeleteModal.showModal();
  }

  onDeleteSuccess($event: any) {
    this.notifyMessage.success('Cor removida com sucesso!');
    console.log($event);
    this._colorListComponent.getColors();
  }

  onDeleteError($event: HttpErrorResponse) {
    this.notifyMessage.success('Não foi possível remover a cor.');
    console.log($event);
  }
}
