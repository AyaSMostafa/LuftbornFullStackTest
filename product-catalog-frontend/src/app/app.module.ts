import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { CategoryCrudComponent } from './components/category/category-crud/category-crud.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Routes } from '@angular/router'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';  
import { CategoryService} from './services/category.service';  
import {ProductService  } from './services/product.service';  
import { Component } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductAddComponent,
    ProductUpdateComponent,
    ProductDeleteComponent,
    CategoryCrudComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet, RouterLink, RouterLinkActive,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    provideClientHydration(),AuthService, ProductService, CategoryService, provideAnimationsAsync('noop') 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
