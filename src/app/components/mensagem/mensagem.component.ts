import { Component, OnInit } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { MessagesService } from 'src/services/messages.service';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.scss']
})

export class MensagemComponent implements OnInit{

  faTimes = faTimes;

  constructor(public messagesS: MessagesService){};

  ngOnInit(): void {};

  
}
