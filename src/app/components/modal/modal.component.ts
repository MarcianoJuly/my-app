import { DataClient } from 'src/app/models/dataClient';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


import { ControleService } from 'src/services/controle.service';

import { faSearch, faTimes, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/services/messages.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
  allDataClients: DataClient[] = [];
    faSearch = faSearch; faTrash = faTrash; faTimes = faTimes; faPenToS = faPenToSquare;
    title = ''
    showMensage = false;

    constructor(private controla:ControleService,
                private mensage: MessagesService,
                private route: Router,
    ){
      this.controla.list() //deveria estar no service
       .pipe(
        catchError(error => {
          this.mensage.add("Erro ao carregar");
          return of([])})
       )
       .subscribe(data => {
          this.allDataClients = data
          this.showMe();
      });
    };

    ngOnInit(): void {};

    async deletar(dados: DataClient){ //não ta pronto
      this.controla.deletaTudo(dados.cpfClient).subscribe(resul => console.log(resul));
      this.mensage.add("Dado excluido com sucesso");

      this.route.navigate(['home']);
    }


    editar(dados: DataClient){ //não ta pronto
      this.route.navigate(['edit', dados.cpfClient]);
    }

    showMe(){
      if (this.allDataClients.length === 0) {
        this.title= 'Não há dados salvos.';
      } else {
        this.title = 'Os dados são: ';
      }
      this.showMensage = true;
    }

    obterDado(e: KeyboardEvent): void {
      const inputValue = (<HTMLInputElement>e.target).value; //deveria estar no service
     //verificar se temos um CEP válido
      this.controla.searsh(inputValue)
        .pipe(
          catchError(error => {
            this.showMensage = false;
            return of([])})
        )
        .subscribe(data => {
            this.allDataClients = data
            this.showMe();
          });
    }
}
