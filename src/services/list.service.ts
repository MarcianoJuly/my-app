import { Injectable } from '@angular/core';

import { FirstComponentComponent } from 'src/app/components/first-component/first-component.component';
import { FormGroup, FormControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() {}

  async getAddress(dados: FormGroup){
    // toggleLoader();
    const apiUrl = `https://viacep.com.br/ws/${dados.value.cep}/json/`;
  
    const response = await fetch(apiUrl);
  
    const data = await response.json();
  
    // Show error and reset form
     if( data.erro === true) {
       return true;
     }
      dados.get('adress')!.setValue(data.logradouro);
      dados.get('city')!.setValue(data.localidade);
      dados.get('neighborhood')!.setValue(data.bairro);
      dados.get('regionState')!.setValue(data.uf);
    return false;
  };
}