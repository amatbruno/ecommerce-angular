import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data-service.service';
import { Products } from '../../models/common.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from '../../services/file-upload.service';
import { FileUpload } from '../../models/file-upload';

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

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  // private storage: Storage = Inject(Storage);

  // uploadProgres$!: Observable<number>;
  // downloadURL$!: Observable<string>;

  constructor(private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private uploadService: FileUploadService) {
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

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }


  // onFileSelected(event: any) {
  //   const selectedFile: File = event.target.files[0];
  //   this.uploadFile(selectedFile);
  //   console.log(selectedFile);
  // }

  // async uploadFile(file: File) {
  //   const filePath = `files/${file.name}`;
  //   const fileRef = ref(this.storage, filePath)
  //   const uploadFile = uploadBytesResumable(fileRef, file);

  //   uploadFile.on('state_changed',
  //     (snapshot) => {
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log('Progress:', progress);
  //     },
  //     (error) => {
  //       console.log('Unexpected error', error);
  //     },
  //     async () => {
  //       console.log('The file was upload correctly');
  //       const url = await getDownloadURL(fileRef);
  //       console.log(url)
  //     }
  //   )
  // }
}
