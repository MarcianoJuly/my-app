import { Component, OnInit } from '@angular/core';

import { DataClient } from '../first-component/dataClient';

import { ControleService } from 'src/services/controle.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{

    allDataClients: DataClient[] = []
    // definidDataClients: DataClient[]= []
    mensage = '';
    showMensage = false;

    constructor(private controla:ControleService,){};

    ngOnInit(): void {
      this.controla.getFormData().subscribe(formData => {
        this.controla = formData;
      });
    };

    addDataClient(data: DataClient){
      this.allDataClients.push(data);
    }

    showMe(){
      if (this.allDataClients.length === 0) {
        this.mensage = 'Não há dados salvos.';
      } else {
        this.mensage = 'Seus dados são: ';
      }
      this.showMensage = true;
    }
}
