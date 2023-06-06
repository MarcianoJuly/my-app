import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListService } from '../../../services/list.service';

import { DataClient } from './dataClient';
import { MessagesService } from 'src/services/messages.service';
import { ControleService } from 'src/services/controle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.scss']
})

export class FirstComponentComponent implements OnInit{

@Output() onSubmit = new EventEmitter<DataClient>();
dataClient!: DataClient;

formulario!: FormGroup;

controle!: ControleService;

test!: string;

  //Validate CEP Input
   validarCEP(e: KeyboardEvent): void {
      const onlyNumbers = /[0-9]|\./;  ///expressão regular
      const key = String.fromCharCode(e.keyCode);

   //permitir somente números
      if (!onlyNumbers.test(key)) {
        e.preventDefault();
        return;
      }
    }

  //Evento para obter o endereço
  obterEndereco(e: KeyboardEvent): void {
    const inputValue = (<HTMLInputElement>e.target).value;
   //verificar se temos um CEP válido
    if (inputValue.length === 8) {
      this.getEndereco();
     }else{
        this.chainLock(false)
     }
 }

 valor: any = {};
   async getEndereco() {
      (await
       //código para obter o endereço a partir do CEP
        this.listService.getAddress(this.test)).subscribe(response => {
        this.valor = response;
        if(this.valor){
          this.formulario.patchValue({
            adress: this.valor.logradouro,
            neighborhood: this.valor.bairro,
            city: this.valor.localidade,
            regionState: this.valor.uf
          });
          this.chainLock(true);
        } else {
          this.chainLock(false); // não esta tratando corretamente
        }
      });
    }

  chainLock(lockSave: Boolean){
    if (lockSave) {
        // Ativa os campos depois de cep
        this.formulario.get('houseNumber')!.enable();
        this.formulario.get('complement')!.enable();
      } else {
        // Desativa os campos depois de cep
        this.formulario.get('adress')!.setValue('');
        this.formulario.get('houseNumber')!.disable();
        this.formulario.get('houseNumber')!.setValue('');
        this.formulario.get('complement')!.disable();
        this.formulario.get('complement')!.setValue('');
        this.formulario.get('neighborhood')!.setValue('');
        this.formulario.get('city')!.setValue('');
        this.formulario.get('regionState')!.setValue('');
      }
  }


async submit() {
    if(this.formulario.invalid){
      this.mensagens.add("Não foi possivel salvar o formulario");
      return;
    }else{
      this.controller.create(this.formulario.value).subscribe(resul => console.log(resul));
      this.mensagens.add("Formulario Salvo com sucesso");
      this.resetForm();
      this.rota.navigate(['home']);
    }
  }

  async resetForm(){
    this.chainLock(false);
    this.formulario.reset();
  }

  async cancel() {
      this.resetForm();
      this.mensagens.add("Inserção cancelada")
      this.rota.navigate(['home']);
  }

  constructor(private listService: ListService,
              private mensagens: MessagesService,
              private controller: ControleService,
              private rota: Router
              ){};

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

   this.formulario.get('houseNumber')!.disable();
   this.formulario.get('complement')!.disable();
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
