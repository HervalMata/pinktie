import {FieldsOptions} from "../../../../common/fields-options";

const fieldsOptions: FieldsOptions = {
  color_name: {
    id: 'color_name',
    label: 'Nome',
    validationMessage: {
      maxLength: 50
    }
  },
  active: {
    id: 'active',
    label: 'Ativa',
  }
}
export default fieldsOptions;
