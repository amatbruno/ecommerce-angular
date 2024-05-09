import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data-service.service';
import { Products } from '../../models/common.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Products[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAllExpenses();
  }

  getAllExpenses() {
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

}
