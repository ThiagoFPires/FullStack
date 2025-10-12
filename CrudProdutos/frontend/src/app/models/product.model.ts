export interface Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}