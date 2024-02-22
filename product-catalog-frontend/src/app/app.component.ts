import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;
  selectedProductId: number | null = null;

  constructor(private authService: AuthService) {
    this.isLoggedIn = authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.authService.authStatusChanged.subscribe((isAuthenticated: boolean) => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  onSelectProduct(productId: number): void {
    this.selectedProductId = productId;
  }

  onDeleteConfirmed(): void {
    console.log('Product deletion confirmed for product ID:', this.selectedProductId);
    this.selectedProductId = null; 
  }

  onDeleteCanceled(): void {
    console.log('Product deletion canceled for product ID:', this.selectedProductId);
    this.selectedProductId = null; 
  }
}
