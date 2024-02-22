import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;
  categories: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id;

        this.productForm = this.formBuilder.group({
          name: ['', [Validators.required]],
          price: [null, [Validators.required, Validators.min(1)]],
          categoryId: [, [Validators.required]]
        });

        this.productService.getProductById(this.productId).subscribe(
          (product) => {
            this.productForm.patchValue(product);
          },
          (error) => {
            console.error('Error fetching product:', error);
          }
        );
      } else {
        this.snackBar.open('Product ID is null!', 'Close', {
          duration: 3000,
        });
        console.error('Product ID is null');
      }
    });
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.updateProduct(this.productId, this.productForm.value).subscribe(
        () => {
          this.snackBar.open('Product Updated successfully!', 'Close', {
            duration: 3000,
          });

          this.router.navigate(['/products']);
        },
        (error) => {
          this.snackBar.open('Error updating product:', 'Close', {
            duration: 3000,
          });
          console.error('Error updating product:', error);
        }
      );
    }
  }
}
