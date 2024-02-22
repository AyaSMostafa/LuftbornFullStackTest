import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5072/api/products';
  products: any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts(): Observable<Product[]> {
    const headers = this.authService.getHeaders();
    return this.http.get<Product[]>(this.apiUrl, { headers });
  }

  getProductById(id: number): Observable<Product> {
    const headers = this.authService.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url, { headers });
  }

  addProduct(product: Product): Observable<Product> {
    const headers = this.authService.getHeaders();
    return this.http.post<Product>(this.apiUrl, product, { headers });
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const headers = this.authService.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Product>(url, product, { headers });
  }

  deleteProduct(id: number): Observable<any> {
    const headers = this.authService.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { headers });
  }
}
