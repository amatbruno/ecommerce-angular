import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getProducts().subscribe(products => {
      console.log('Product added:', products);
      this.products = products;
    })
  }
}
