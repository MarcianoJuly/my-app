import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListService } from '../../../services/list.service';

import { DataClient } from './dataClient';
import { MessagesService } from 'src/services/messages.service';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.scss']
})

export class FirstComponentComponent implements OnInit{

@Output() onSubmit = new EventEmitter<DataClient>()

dataClient = new DataClient();

formulario!: FormGroup;

  //Validate CEP Input
  validarCEP(e: KeyboardEvent): void {
     const onlyNumbers = /[0-9]|\./;  //expressão regular
     const key = String.fromCharCode(e.keyCode);

  //permitir somente números
     if (!onlyNumbers.test(key)) {
       e.preventDefault();
       return;
     }
   }

  //Evento para obter o endereço
   obterEndereco(e: KeyboardEvent): void {
     const inputValue = (e.target as HTMLInputElement).value;
    //verificar se temos um CEP válido
     if (inputValue.length === 8) {
       this.getEndereco();
      }else{
         this.chainLock(false)
      }
  }

   async getEndereco() {
      //código para obter o endereço a partir do CEP
      if(!await this.listService.getAddress(this.formulario)){
          this.chainLock(true)
      }else{
         this.chainLock(false)
      }
    }
  
  chainLock(lockSave: Boolean){
    if (lockSave) {
        // Ativa os campos depois de cep
        this.formulario.get('adress')!.enable();
        this.formulario.get('houseNumber')!.enable();
        this.formulario.get('complement')!.enable();
        this.formulario.get('neighborhood')!.enable();
        this.formulario.get('city')!.enable();
        this.formulario.get('regionState')!.enable();
      } else {
        // Desativa os campos depois de cep
        this.formulario.get('adress')!.disable();
        this.formulario.get('adress')!.setValue('');
        this.formulario.get('houseNumber')!.disable();
        this.formulario.get('houseNumber')!.setValue('');
        this.formulario.get('complement')!.disable();
        this.formulario.get('complement')!.setValue('');
        this.formulario.get('neighborhood')!.disable();
        this.formulario.get('neighborhood')!.setValue('');
        this.formulario.get('city')!.disable();
        this.formulario.get('city')!.setValue('');
        this.formulario.get('regionState')!.disable();
        this.formulario.get('regionState')!.setValue('');
      }
  }


  submit() {
    if(this.formulario.invalid){
      this.mensagens.add("Não foi possivel salvar o formulario");
      return;
    }else{
      const formValues = this.formulario.value;
      this.dataClient.setValue(formValues);
      console.log(this.dataClient);
      this.onSubmit.emit(this.dataClient);
      this.mensagens.add("Formulario Salvo com sucesso");
      this.formulario.reset();
    }
  }

  constructor(private listService: ListService, private mensagens: MessagesService){};

   ngOnInit(): void {
    this.formulario = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cpfClient: new FormControl('', [Validators.required]),
      bornIn: new FormControl('', [Validators.required]),
      emailClient: new FormControl('', [Validators.required]),
      telephones: new FormControl(''),
      cep: new FormControl('', [Validators.required]),
      adress: new FormControl('', [Validators.required]),
      houseNumber: new FormControl('', [Validators.required]),
      complement: new FormControl(''),
      neighborhood: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      regionState: new FormControl('', [Validators.required]),
    });

    this.formulario.get('adress')!.disable();
    this.formulario.get('houseNumber')!.disable();
    this.formulario.get('complement')!.disable();
    this.formulario.get('neighborhood')!.disable();
    this.formulario.get('city')!.disable();
    this.formulario.get('regionState')!.disable();
    
    const cepInput = document.getElementById('cepInput') as HTMLInputElement;

    cepInput.addEventListener('keypress', this.validarCEP);
    cepInput.addEventListener('keyup', this.obterEndereco.bind(this));
  }

  get name(){
    return this.formulario.get('name')!;
  }

  get cpfClient(){
    return this.formulario.get('cpfClient')!;
  }

  get bornIn(){
    return this.formulario.get('bornIn')!;
  }

  get emailClient(){
    return this.formulario.get('emailClient')!;
  }

  get houseNumber(){
    return this.formulario.get('houseNumber')!;
  }

  get cep(){
    return this.formulario.get('cep')!;
  }

  get adress(){
    return this.formulario.get('adress')!;
  }

  get neighborhood(){
    return this.formulario.get('neighborhood')!;
  }

  get city(){
    return this.formulario.get('city')!;
  }

  get regionState(){
    return this.formulario.get('regionState')!;
  }
  
}
