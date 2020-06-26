import {Component, OnInit, ViewChild} from '@angular/core';
import {Color} from "../../../../model";
import {ColorNewModalComponent} from "../color-new-modal/color-new-modal.component";
import {ColorEditModalComponent} from "../color-edit-modal/color-edit-modal.component";
import {ColorDeleteModalComponent} from "../color-delete-modal/color-delete-modal.component";
import {ColorHttpService} from "../../../../services/http/color-http.service";
import {ColorInsertService} from "./color-insert.service";
import {ColorEditService} from "./color-edit.service";
import {ColorDeleteService} from "./color-delete.service";

@Component({
  selector: 'color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  colors: Array<Color> = [];
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  };

  sortColumn = {column: '', sort: ''};

  @ViewChild(ColorNewModalComponent)
  colorNewModal: ColorNewModalComponent;

  @ViewChild(ColorEditModalComponent)
  colorEditModal: ColorEditModalComponent;

  @ViewChild(ColorDeleteModalComponent)
  colorDeleteModal: ColorDeleteModalComponent;

  colorId: number;
  searchText: string;

  constructor(
    private colorHttp: ColorHttpService,
    protected colorInsertService: ColorInsertService,
    protected colorEditService: ColorEditService,
    protected colorDeleteService: ColorDeleteService
  ) {
    this.colorInsertService.colorListComponent = this;
    this.colorEditService.colorListComponent = this;
    this.colorDeleteService.colorListComponent = this;
  }

  ngOnInit() {
    this.getColors();
  }

  getColors() {
    this.colorHttp.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn,
      search: this.searchText
    })
      .subscribe(response => {
        console.log(response.data);
        this.colors = response.data;
        this.pagination.totalItems = response.meta.total;
      })
  }

  pageChanged(page) {
    this.pagination.page = page;
    this.getColors();
  }

  sort(sortColumn) {
    this.getColors();
  }

  search(search) {
    this.searchText = search;
    this.getColors();
  }

}
