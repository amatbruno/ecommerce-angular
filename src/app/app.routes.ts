import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { FormProductsComponent } from './components/form-products/form-products.component';

export const routes: Routes = [
    { path: 'products', component: ProductsComponent },
    { path: 'add', component: FormProductsComponent },
    { path: 'add/:id', component: FormProductsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
