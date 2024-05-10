import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
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

  constructor(private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.productForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      price: new FormControl('', [Validators.required, Validators.max(750)]),
      desc: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      sale: new FormControl(''),
      date: new FormControl('', [Validators.required]),
      photo: new FormControl(''),
    })
  }

  ngOnInit(): void {
  }



}
