import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  productId: number = 0;
  confirmDelete: boolean = false;


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.productId) {
      this.route.paramMap.subscribe(params => {
        this.productId = +params.get('id')!;
      });
    }
  }
  confirmDeletion(): void {
    this.confirmDelete = true;
    this.onDelete();
  }

  cancelDeletion(): void {
    this.confirmDelete = false;
    this.router.navigate(['/products']);
  }

  onDelete(): void {
    if (this.confirmDelete) {
      this.productService.deleteProduct(this.productId).subscribe(
        () => {
          this.snackBar.open('Product Deleted successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
}
