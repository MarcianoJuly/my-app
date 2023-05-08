import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ControleService {

  private formDataSubject = new BehaviorSubject<any>({});

  constructor() { }
  
  setFormData(formData: any) {
    this.formDataSubject.next(formData);
  }

  getFormData() {
    return this.formDataSubject.asObservable();
  }


}
