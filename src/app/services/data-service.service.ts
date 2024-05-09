import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Products } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private dbUrl = "/products";
  productsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.productsRef = db.list(this.dbUrl);
  }

  getAllProducts() {
    return this.productsRef;
  }

  getProduct(key: string) {
    return this.db.object(`${this.dbUrl}/${key}`);
  }

  addProduct(product: Products) {
    this.productsRef.push(product)
  }

  updateProduct(key: string, product: Products) {
    this.productsRef.update(key, product)
  }

  deleteProduct(key: string) {
    return this.productsRef.remove(key)
  }

}
