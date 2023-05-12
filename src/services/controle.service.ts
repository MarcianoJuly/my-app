import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataClient } from 'src/app/components/first-component/dataClient';


@Injectable({
  providedIn: 'root'
})

export class ControleService {
  allDataClients: DataClient[] = []
  editDataClient!: DataClient;

  constructor() { }
  
  save(newData: DataClient){
    this.allDataClients.push(newData);
  }

  delete(index: number){
    this.allDataClients.splice(index, 1);
  }

  getData(index: number){
    this.editDataClient = this.allDataClients[index];
    this.delete(index);
  }

  saveBack(){
    this.allDataClients.push(this.editDataClient);
  }

}
