import { Component, OnInit } from '@angular/core';

import { DataClient } from '../first-component/dataClient';

import { ControleService } from 'src/services/controle.service';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/services/messages.service';
import { Router } from '@angular/router';
import { EditDataComponent } from '../edit-data/edit-data.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
  allDataClients: DataClient[] = [];

    title = ''
    showMensage = false;
    faTimes = faTimes;

    constructor(private controla:ControleService,
                private mensage: MessagesService,
                private route: Router,
    ){};

    ngOnInit(): void {
       this.allDataClients= this.controla.allDataClients;
       this.showMe();
    };

    async delete(index: number){
      await this.controla.delete(index);
      this.mensage.add("Dado excluido com sucesso");

      this.route.navigate(['home']);
    }

    editar(index: number){
      this.controla.getData(index);

      
      this.route.navigate(['\edit']);
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
