import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data-service.service';

@Component({
  selector: 'app-form-products',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.css'
})

export class FormProductsComponent implements OnInit {
  productForm: FormGroup;
  isFormSubmitted: boolean = false;

  products: any[] = [];

  constructor(private dataService: DataService) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      price: new FormControl('', [Validators.required, Validators.max(750)]),
      desc: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      sale: new FormControl(''),
      date: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() { }

  add() {
    this.dataService.sendProducts([this.productForm.value]);
    this.productForm.reset();
  }
}
