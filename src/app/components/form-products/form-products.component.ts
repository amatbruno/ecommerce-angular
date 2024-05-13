import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data-service.service';

@Component({
  selector: 'app-form-products',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.css'
})

export class FormProductsComponent {
  productForm!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder,
    private dataService: DataService) {
    this.productForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      price: new FormControl('', [Validators.required, Validators.max(750)]),
      desc: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      sale: new FormControl(''),
      date: new FormControl('', [Validators.required]),
      photo: new FormControl(''),
    })
  }

  saveProduct(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.dataService.create(this.productForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }


  newProduct(): void {
    this.productForm.reset();
    this.submitted = false;
  }
}
