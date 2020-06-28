import {FieldsOptions} from "../../../../common/fields-options";

const fieldsOptions: FieldsOptions = {
  name: {
    id: 'name',
    label: 'Nome',
    validationMessage: {
      maxLength: 50
    }
  },
  email: {
    id: 'email',
    label: 'Email'
  },
  password: {
    id: 'password',
    label: 'Senha',
    validationMessage: {
      minLength: 6
    }
  }
}
export default fieldsOptions;
