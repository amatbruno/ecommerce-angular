import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { FormProductsComponent } from './components/form-products/form-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
    { path: 'products', component: ProductsComponent },
    { path: 'add', component: FormProductsComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
