import { Component, OnInit } from '@angular/core';

import { DataClient } from '../first-component/dataClient';

import { ControleService } from 'src/services/controle.service';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
  allDataClients: DataClient[] = [];
  definidDataClients!: DataClient;

    title = ''
    showMensage = false;
    faTimes = faTimes;

    constructor(private controla:ControleService){};

    ngOnInit(): void {
       this.allDataClients= this.controla.allDataClients;
       this.showMe();
    };

    delete(index: number){
      this.controla.delete(index);
    }

    showMe(){
      if (this.allDataClients.length === 0) {
        this.title= 'Não há dados salvos.';
      } else {
        this.title = 'Os dados são: ';
      }
      this.showMensage = true;
    }

}
