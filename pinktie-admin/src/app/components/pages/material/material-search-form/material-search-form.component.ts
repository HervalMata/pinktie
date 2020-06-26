import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'material-search-form',
  templateUrl: './material-search-form.component.html',
  styleUrls: ['./material-search-form.component.css']
})
export class MaterialSearchFormComponent implements OnInit {

  search: "";

  @Output()
  onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  submit() {
    this.onSearch.emit(this.search);
    return false;
  }

}
