import {FieldsOptions} from "../../../../common/fields-options";

const fieldsOptions: FieldsOptions = {
  category_name: {
    id: 'category_name',
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
