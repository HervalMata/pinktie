export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  profile?: UserProfile;
  readonly created_at?: {date: string};
  readonly updated_at?: {date: string};
}

export interface UserProfile {
  photo_url: string;
  address: string;
  has_photo: boolean;
}

export interface Category {
  id?: number;
  category_name: string;
  readonly slug?: string;
  active: boolean;
  readonly created_at?: {date: string};
  readonly updated_at?: {date: string};
}

export interface Product {
  id?: number;
  product_name: string;
  product_code: string;
  description: string;
  stock: number;
  price: number;
  category: Category;
  readonly slug?: string;
  active: boolean;
  readonly created_at?: {date: string};
  readonly updated_at?: {date: string};
}

export interface Color {
  id?: number;
  color_name: string;
  readonly slug?: string;
  active: boolean;
  readonly created_at?: {date: string};
  readonly updated_at?: {date: string};
}

export interface Material {
  id?: number;
  material_name: string;
  readonly slug?: string;
  active: boolean;
  readonly created_at?: {date: string};
  readonly updated_at?: {date: string};
}

export interface ProductColor {
  product: Product;
  colors: Color[];
}

export interface ProductMaterial {
  product: Product;
  materials: Material[];
}

export interface ProductPhoto {
  id?: number;
  photo_url: string;
  product?: Product;
  readonly created_at?: {date: string};
  readonly updated_at?: {date: string};
}
