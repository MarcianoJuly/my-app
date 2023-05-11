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
  
  delete(index: number){
    console.log(this.allDataClients)
    this.allDataClients.splice(index, 1);
  }

  setFormData(formData: any) {
    this.formDataSubject.next(formData);
  }

  getFormData() {
    return this.formDataSubject.asObservable();
  }


}
