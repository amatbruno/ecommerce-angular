import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { FormProductsComponent } from './form-products/form-products.component';

export const routes: Routes = [
    {path: 'products', component: ProductsComponent},
    {path: 'add-products', component: FormProductsComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
];
