import {ElementRef, Injectable} from "@angular/core";
import {AbstractControl} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryIdFieldService {

  data;
  options: Select2Options;
  select2Element: ElementRef;
  formControl: AbstractControl;

  constructor(private authService: AuthService) {
  }

  get divModal() {
    const modalElement = this.select2Native.closest('modal');
    return modalElement.firstChild;
  }

  get select2Native() : HTMLElement {
    return this.select2Element.nativeElement;
  }

  make(select2Element: ElementRef, formControl: AbstractControl) {
    this.select2Element = select2Element;
    this.formControl = formControl;
    this.options = {
      dropdownParent: $(this.divModal),
      minimumInputLength: 1,
      theme: 'bootstrap4',
      ajax: {
        headers: {
          'Authorization' : this.authService.authorizationHeader
        },
        url: `${environment.api.url}/categories`,
        data(params) {
          return {
            search: params.term
          }
        },
        processResults(data) {
          return {
            results: data.data.map((category) => {
              return {id: category.id, text: category.category_name}
            })
          }
        }
      }
    };
    this.data = [];
    this.onclosingDropdown();
    this.resetSelectOnSetNull();
  }

  private onclosingDropdown() {
    $(this.select2Native).on('select2:closing', (e: Event) => {
      const element: HTMLInputElement = (<any> e.target);
      this.formControl.markAsTouched();
      this.formControl.setValue(element.value);
    });
  }

  private resetSelectOnSetNull() {
    this.formControl.valueChanges.subscribe((value) => {
      if (!value) {
        const selectField = $(this.select2Native).find('select');
        selectField.val(null).trigger('change');
      }
    });
  }

  updateFormControl(value) {
    this.formControl.setValue(value);
  }
}
