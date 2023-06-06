import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { DataClient } from 'src/app/components/first-component/dataClient';
import { PROXY_CONFIG } from 'src/proxy.conf';


@Injectable({
  providedIn: 'root'
})

export class ControleService {

  constructor(private httpClient: HttpClient) {}

  list(){
    return this.httpClient.get<DataClient[]>(`${PROXY_CONFIG.baseURl}`)
    .pipe(
      tap(tipo => console.log(tipo))
    );
  }

  create(newData: DataClient){
    return this.httpClient.post<DataClient>(`${PROXY_CONFIG.baseURl}`, newData);
  }

  update(alterData: DataClient){
    return this.httpClient.put<DataClient>(`${PROXY_CONFIG.baseURl}/${alterData.cpfClient}`, alterData);
  }

  deletaTudo(cpf: string){
    return this.httpClient.delete(`${PROXY_CONFIG.baseURl}/${cpf}`)
    .pipe(
      tap(response => console.log(response)),
        catchError(error => {
          console.error(error);
          return throwError('Erro ao excluir objeto');
        })
      );
  }

  getData(cpf: string){
    return this.httpClient.get<DataClient>(`${PROXY_CONFIG.baseURl}/${cpf}`);
  }

  searsh(input: string){
    return this.httpClient.get<DataClient[]>(`${PROXY_CONFIG.baseURl}/${input}`);
  }

}
