import { Component } from '@angular/core';
import { ControleService } from 'src/services/controle.service';
import { DataClient } from '../first-component/dataClient';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  dataSearch: DataClient[] = []
  faSearch = faSearch;
  show: boolean = false;

  constructor(private controla: ControleService){}
  
  ngOnInit(){}

  obterDado(e: KeyboardEvent): void {
    const inputValue = (<HTMLInputElement>e.target).value;
   //verificar se temos um CEP válido
    this.dataSearch = this.controla.searsh(inputValue);
    if(this.dataSearch.length==0){
      this.show = false;
    }else{
      this.show = true;
    }
 }
}
