import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataClient } from 'src/app/components/first-component/dataClient';


@Injectable({
  providedIn: 'root'
})

export class ControleService {
  allDataClients: DataClient[] = []

  private formDataSubject = new BehaviorSubject<any>({});

  constructor() { }
  
  setFormData(formData: any) {
    this.formDataSubject.next(formData);
  }

  getFormData() {
    return this.formDataSubject.asObservable();
  }


}
