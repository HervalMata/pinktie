import {FieldsOptions} from "../../../../common/fields-options";

const fieldsOptions: FieldsOptions = {
  material_name: {
    id: 'material_name',
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
