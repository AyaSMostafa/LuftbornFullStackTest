
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { CategoryCrudComponent } from './components/category/category-crud/category-crud.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard]   },
  { path: 'products/add', component: ProductAddComponent, canActivate: [AuthGuard] },
  { path: 'products/update/:id', component: ProductUpdateComponent, canActivate: [AuthGuard]  },
  { path: 'products/delete/:id', component: ProductDeleteComponent, canActivate: [AuthGuard]  },
  
  { path: 'categories', component: CategoryCrudComponent, canActivate: [AuthGuard]  },

  { path: '', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
