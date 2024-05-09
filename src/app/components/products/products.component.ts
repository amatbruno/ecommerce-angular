import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data-service.service';
import { Products } from '../../models/common.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Products[] = [];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.dataService.getAllProducts().snapshotChanges().subscribe({
      next: (data) => {
        this.products = [];

        data.forEach((item) => {
          let product = item.payload.toJSON() as Products;

          this.products.push({
            key: item.key || '',
            name: product.name,
            price: product.price,
            description: product.description,
            onSale: product.onSale,
            date: product.date
          })
        })
      }
    })
  }

  editProduct(key: string) {
    this.router.navigate(['/add/' + key])
  }

  removeProduct(key: string) {
    if (window.confirm('You gonna delete a product, are you sure?')) {
      this.dataService.deleteProduct(key)
    }
  }

}
