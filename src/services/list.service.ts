import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FirstComponentComponent } from 'src/app/components/first-component/first-component.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) {}

  async getAddress(cep: string ): Promise<Observable<String[]>>{ 
    // toggleLoader();
   return this.http.get<String[]>(`https://viacep.com.br/ws/${cep}/json/`);
  };
}