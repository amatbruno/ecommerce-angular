import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  private products: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public sendProducts(products: any[]): void {
    this.products.next(products);
  }

  public getProducts(): Observable<any[]> {
    return this.products;
  }
}
