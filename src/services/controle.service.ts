import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataClient } from 'src/app/components/first-component/dataClient';


@Injectable({
  providedIn: 'root'
})

export class ControleService {
  allDataClients: DataClient[] = []

  constructor() { }
  
  delete(index: number){
    this.allDataClients.splice(index, 1);
  }

  getData(index: number): DataClient{
    return this.allDataClients[index];
  }

}
