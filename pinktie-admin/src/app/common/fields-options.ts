import {error} from "@angular/compiler/src/util";

export interface FieldsOptions {
  [field: string]: {
    id: string,
    label: string,
    validationMessage?: {
      [error: string]: any
    }
  }
}
