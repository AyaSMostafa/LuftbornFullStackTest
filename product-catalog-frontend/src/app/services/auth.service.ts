import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';  

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5072/api/account';
  private tokenKey = 'token';
  public authStatusChanged = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  register(user: RegisterUserDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user)
      .pipe(
        tap((response: any) => {
          this.storeToken(response.token);  
        })
      );
  }

  login(user: LoginUserDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user)
      .pipe(
        tap((response: any) => {
          this.storeToken(response.token);
        })
      );
  }

  getAuthToken(): string | null {
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('token');
    } else {
        return null;
    }
}

private storeToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('token', token);
    }
}

  getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
  private handleAuthentication(response: any): void {
    if (response.token) {
      this.storeToken(response.token);
      this.authStatusChanged.next(true);
    }
  }
  logout(): void {
    localStorage.removeItem('token');
    this.authStatusChanged.next(false);

  }
 
}


export interface RegisterUserDto {
  userName: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface LoginUserDto {
  userName: string;
  password: string;
}
