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
