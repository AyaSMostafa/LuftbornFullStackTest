import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../../models/product.model';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm!: FormGroup;
  categories: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
      categoryId: [, [Validators.required]]
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
      this.productService.addProduct(this.productForm.value).subscribe(
        () => {
          this.snackBar.open('Product added successfully!', 'Close', {
            duration: 3000,
          });

          this.router.navigate(['/products']);
        },
        (error) => console.error('Error adding product:', error)
      );
    }
    else{
      const errors = this.productForm.errors || {};
      errors['summary'] = 'Please, add a valid inputs and try again.';
      this.productForm.setErrors(errors);
    }
  }
}
