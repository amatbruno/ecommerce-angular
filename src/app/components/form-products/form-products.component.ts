import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data-service.service';
import { Products } from '../../models/common.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-products',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.css'
})

export class FormProductsComponent implements OnInit {
  productForm!: FormGroup;
  productId = '';
  products: Products[] = [];

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.productForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      price: new FormControl('', [Validators.required, Validators.max(750)]),
      desc: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      sale: new FormControl(''),
      date: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
        this.getProduct(this.productId);
      }
    })
  }

  onSubmit() {
    if (this.productForm.valid) {
      if (this.productId !== '') {
        this.dataService.updateProduct(this.productId, this.productForm.value)
      } else {
        this.dataService.addProduct(this.productForm.value)
      }
      this.router.navigate(['/products']);
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  getProduct(key: string) {
    this.dataService.getProduct(key).snapshotChanges().subscribe({
      next: (data) => {
        let product = data.payload.toJSON() as Products;
        this.productForm.setValue(product);
      }
    })
  }
}
