import { Component, Input, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data-service.service';
import { Products } from '../../models/common.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products?: Products[];
  currentProduct: Products = {};
  currentIndex = -1;
  name = '';

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  retrieveProducts(): void {
    this.dataService.getAll()
      .subscribe({
        next: (data) => {
          this.products = data;
          //console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveProducts();
    this.currentProduct = {};
    this.currentIndex = -1;
  }

  deleteProduct(product: Products): void {
    this.currentProduct = product;
    this.dataService.delete(product.id)
      .subscribe({
        next: (res) => {
          this.refreshList();
          this.router.navigate(['/products']);
        },
        error: (e) => console.error(e)
      });
  }
}
