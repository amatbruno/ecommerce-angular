import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-products',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.css'
})

export class FormProductsComponent {
  productForm: FormGroup;
  isFormSubmitted: boolean = false;

  products: any[] = [];

  constructor() {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      price: new FormControl('', [Validators.required, Validators.max(750)]),
      desc: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    })
  }

  add() {
    this.products.push(this.productForm.value);
  }
}
