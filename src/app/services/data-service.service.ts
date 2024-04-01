import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private productAddedSubject = new Subject<any>();

  constructor() { }

  emitProductAdded(product: any) {
    this.productAddedSubject.next(product);
  }

  getProductAddedObservable(): Observable<any> {
    return this.productAddedSubject.asObservable();
  }
}
