import {FieldsOptions} from "../../../../common/fields-options";

const fieldsOptions: FieldsOptions = {
  product_name: {
    id: 'product_name',
    label: 'Nome',
    validationMessage: {
      maxLength: 50
    }
  },
  product_code: {
    id: 'product_code',
    label: 'Código',
  },
  description: {
    id: 'description',
    label: 'Descrição',
    validationMessage: {
      cols: 30,
      rows: 10
    }
  },
  stock: {
    id: 'stock',
    label: 'Estoque',
    validationMessage: {
      min: 1
    }
  },
  price: {
    id: 'price',
    label: 'Preço',
    validationMessage: {
      min: 1
    }
  },
  category_id: {
    id: 'category_id',
    label: 'Categoria',
  },
  active: {
    id: 'active',
    label: 'Ativa',
  }
}
export default fieldsOptions;
