import {Category} from '../models/category.model';

export interface Product {
    productId: number;
    name: string;
    price: number;
    categoryId: number;
    category?: Category; 
  }
  