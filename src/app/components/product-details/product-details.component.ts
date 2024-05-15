import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Products } from '../../models/common.model';
import { DataService } from '../../services/data-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentProduct: Products = {
    name: '',
    price: undefined,
    description: '',
    onSale: false,
    date: '',
    imageUrl: '',
  };

  message = '';
  productForm!: FormGroup;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();

    if (!this.viewMode) {
      this.message = '';
      this.getProduct(this.route.snapshot.params['id']);
    }
  }

  initializeForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      description: ['', Validators.required],
      onSale: [false],
      date: [null, Validators.required],
    });
  }

  getProduct(id: string): void {
    this.dataService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProduct = data;
          this.productForm.patchValue(data);
          // console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateProduct(): void {
    this.message = '';

    this.dataService.update(this.currentProduct.id, this.productForm.value)
      .subscribe({
        next: (res) => {
          // console.log(res);
          // this.message = res.message ? res.message : 'This tutorial was updated successfully!';
          this.router.navigate(['/products']);
        },
        error: (e) => console.error(e)
      });
  }


}
