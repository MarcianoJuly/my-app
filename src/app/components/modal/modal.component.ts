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
  allDataClients: DataClient[] = []

    // definidDataClients: DataClient[]= []
    mensage = '';
    title = ''
    showMensage = false;
    faTimes = faTimes;

    constructor(private controla:ControleService,){};

    ngOnInit(): void {
       this.allDataClients= this.controla.allDataClients;
    };

    addDataClient(data: DataClient){
      this.allDataClients.push(data);
    }

    showMe(){
      if (this.allDataClients.length === 0) {
        this.title= 'Não há dados salvos.';
        this.mensage = '';
      } else {
        let dadosFormatados = this.allDataClients.map(dado => `Nome :${dado.name}
                                                              \n CPF :${dado.cep}
                                                              \n Data de nascimento: ${dado.bornIn}
                                                              \n Email: ${dado.emailClient}
                                                              \n Telefone: ${dado.telephones}
                                                              \n CEP: ${dado.cep}
                                                              \n Endereço: ${dado.adress} Numero da casa: ${dado.houseNumber}
                                                              \n Complemento: ${dado.complement}
                                                              \n Bairro: ${dado.neighborhood}
                                                              \n Cidade: ${dado.city} Estado: ${dado.regionState}`);
        this.title = 'Os dados registrados são:';
        this.mensage = dadosFormatados.join('\n');
      }
      this.showMensage = true;
    }

    zero(){
      this.showMensage = false;
    }
}
