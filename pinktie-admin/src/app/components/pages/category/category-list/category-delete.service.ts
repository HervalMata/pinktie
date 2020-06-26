import { Injectable } from '@angular/core';
import {CategoryListComponent} from "./category-list.component";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryDeleteService {

  private _categoryListComponent: CategoryListComponent;

  constructor(private notifyMessage: NotifyMessageService) { }

  set categoryListComponent(value: CategoryListComponent) {
    this._categoryListComponent = value;
  }

  showModalDelete(categoryId: number) {
    this._categoryListComponent.categoryId = categoryId;
    this._categoryListComponent.categoryDeleteModal.showModal();
  }

  onDeleteSuccess($event: any) {
    this.notifyMessage.success('Categoria removida com sucesso!');
    console.log($event);
    this._categoryListComponent.getCategories();
  }

  onDeleteError($event: HttpErrorResponse) {
    this.notifyMessage.success('Não foi possível remover a categoria.');
    console.log($event);
  }
}
