import { Component, Input, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data-service.service';
import { Products } from '../../models/common.model';
import { Router, RouterModule } from '@angular/router';
import { FileUpload } from '../../models/file-upload';
import { FileUploadService } from '../../services/file-upload.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Products[] = [];
  @Input() fileUpload!: FileUpload;
  fileUploads!: any[];

  constructor(private dataService: DataService,
    private router: Router,
    private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.getAllProducts();

    this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
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
