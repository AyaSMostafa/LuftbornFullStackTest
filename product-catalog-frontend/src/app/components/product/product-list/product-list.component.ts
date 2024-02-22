import { Component, NgModule, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { AuthGuard } from '../../../services/guards/auth.guard';
import { CommonModule, NgFor } from '@angular/common'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import {Category} from '../../../models/category.model';
import {Product} from '../../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private authGuard: AuthGuard,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
      this.products.forEach((product: Product) => {
        this.categoryService.getCategoryById(product.categoryId).subscribe(
          (category: Category) => {
            product.category = category;
          },
          (error) => {
            console.error(`Error fetching category for product ${product.productId}:`, error);
          }
        );
      });
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  
    
  addProduct(): void {
    console.log('Add product clicked');
    this.router.navigate(['/products/add']);
  }

  editProduct(productId: number): void {
    console.log('Update product clicked for ID:', productId);
    this.router.navigate(['/products/update', productId]);
  }

  deleteProduct(productId: number): void {
    console.log('Delete product clicked for ID:', productId);
    this.router.navigate(['/products/delete', productId]);
  }
  
}