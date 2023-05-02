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
    definidDataClients: DataClient[]= [] 

    constructor(private controla:ControleService){};

    createHandler(event: Event){

    }

    ngOnInit(): void {};

    
}
