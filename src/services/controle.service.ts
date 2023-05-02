import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DataClient } from 'src/app/components/first-component/dataClient';

@Injectable({
  providedIn: 'root'
})
export class ControleService {

  constructor(private Http: HttpClient) { }

}
