import { Component } from '@angular/core';

import { DataClient } from '../first-component/dataClient';
import { ControleService } from 'src/services/controle.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListService } from 'src/services/list.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/services/messages.service';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent {
  dataEditable!: DataClient;
  formulario!: FormGroup;
  test: any;

  constructor(private controla:ControleService, private listService:ListService, private route:Router, private mensagens:MessagesService){}

  ngOnInit(): void{
    this.dataEditable = this.controla.editDataClient;
    console.log(this.dataEditable);
    this.formulario = new FormGroup({
      name: new FormControl(this.dataEditable.name, [Validators.required]),
      cpfClient: new FormControl(this.dataEditable.cpfClient),
      bornIn: new FormControl(this.dataEditable.bornIn, [Validators.required]),
      emailClient: new FormControl(this.dataEditable.emailClient, [Validators.required]),
      telephones: new FormControl(this.dataEditable.telephones),
      cepC: new FormControl(this.dataEditable.cep, [Validators.required]),
      adress: new FormControl(this.dataEditable.adress, [Validators.required]),
      houseNumber: new FormControl(this.dataEditable.houseNumber, [Validators.required]),
      complement: new FormControl(this.dataEditable.complement),
      neighborhood: new FormControl(this.dataEditable.neighborhood, [Validators.required]),
      city: new FormControl(this.dataEditable.city, [Validators.required]),
      regionState: new FormControl(this.dataEditable.regionState, [Validators.required]),
    });
    this.test = this.dataEditable.cep;
  }

  save(){
    const formDatas = this.formulario.value;
    console.log(formDatas);
    if(this.formulario.invalid){
      this.mensagens.add("Não foi possivel salvar");
      return;
    }else{
      this.dataEditable = formDatas;
      this.controla.save(this.dataEditable);
      this.mensagens.add("Mudança salva com sucesso");
      this.route.navigate(['\modalDatas']);
    }
  }

  rollBack(){
    this.controla.saveBack();
    this.route.navigate(['\modalDatas']);
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
  
  get cepC(){
    return this.formulario.get('cepC')!;
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

}
