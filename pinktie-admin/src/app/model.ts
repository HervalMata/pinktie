export interface User {
  id?:number;
  name: string;
  email: string;
  password?: string;
  profile?: UserProfile;
  readonly created_at?: {date: string};
  readonly updated_at?: {date: string};
}

export interface UserProfile {
  photo_url: string;
  phone_number: string;
  has_photo: boolean;
}

export interface Category {
  id?:number;
  category_name: string;
  readonly slug?: string;
  active: boolean;
  readonly created_at?: {date: string};
  readonly updated_at?: {date: string};
}
