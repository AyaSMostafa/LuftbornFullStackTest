import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:5072/api/categories';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCategories(): Observable<Category[]> {
    const headers = this.authService.getHeaders();
    return this.http.get<Category[]>(this.apiUrl, { headers });
  }

  getCategoryById(id: number): Observable<Category> {
    const headers = this.authService.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Category>(url, { headers });
  }

  addCategory(category: Category): Observable<Category> {
    const headers = this.authService.getHeaders();
    return this.http.post<Category>(this.apiUrl, category, { headers });
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    const headers = this.authService.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Category>(url, category, { headers });
  }

  deleteCategory(id: number): Observable<any> {
    const headers = this.authService.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { headers });
  }
}
