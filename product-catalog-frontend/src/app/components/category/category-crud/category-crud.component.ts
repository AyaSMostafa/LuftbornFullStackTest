import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { AuthGuard } from '../../../services/guards/auth.guard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-crud',
  templateUrl: './category-crud.component.html',
  styleUrls: ['./category-crud.component.css']
})
export class CategoryCrudComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category = {} as Category;

  constructor(private categoryService: CategoryService,
    private authGuard: AuthGuard,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  selectCategory(category: Category): void {
    this.selectedCategory = { ...category };
  }

  addCategory(category: Category, form: NgForm): void {
    if (form.invalid) {
      this.snackBar.open('Name is Required!', 'Close', {
        duration: 3000,
      });
      return;
    }
    if (this.authGuard.canActivate(null!, null!)) {
      this.categoryService.addCategory(category).subscribe(() => {
        this.snackBar.open('Category added successfully!', 'Close', {
          duration: 3000,
        });
        this.loadCategories();
        this.clearSelection();
      });
    } else {
      console.error('User is not authenticated to add a category.');
    }
  }

  updateCategory(category: Category): void {
    if (this.authGuard.canActivate(null!, null!)) {
      this.categoryService.updateCategory(category.categoryId, category).subscribe(() => {
        this.snackBar.open('Category updated successfully!', 'Close', {
          duration: 3000,
        });
        this.loadCategories();
        this.clearSelection();
      });
    } else {
      console.error('User is not authenticated to update a category.');
    }
  }

  deleteCategory(id: number): void {
    if (this.authGuard.canActivate(null!, null!)) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.snackBar.open('Category deleted successfully!', 'Close', {
          duration: 3000,
        });
        this.loadCategories();
        this.clearSelection();
      });
    } else {
      console.error('User is not authenticated to delete a category.');
    }
  }

  clearSelection(): void {
    this.selectedCategory = {} as Category;
  }
}
