import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ControleService } from 'src/services/controle.service';
import { DataClient } from '../../models/dataClient';

@Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<DataClient> {

  constructor(private serviceD: ControleService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataClient> {
    if (route.params && route.params['CPF']){
      return this.serviceD.getData(route.params['CPF']);
    }
    return of();
  }
}
