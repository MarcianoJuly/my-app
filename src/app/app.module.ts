import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponentComponent } from './components/first-component/first-component.component';
import { ModalComponent } from './components/modal/modal.component';
import { MensagemComponent } from './components/mensagem/mensagem.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { HomeComponent } from './components/home/home.component';
import { EditDataComponent } from './components/edit-data/edit-data.component';


@NgModule({
  declarations: [
    AppComponent,
    FirstComponentComponent,
    ModalComponent,
    MensagemComponent,
    CabecalhoComponent,
    HomeComponent,
    EditDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterLink,
  ],
  providers: [],
  bootstrap: [AppComponent,FirstComponentComponent,ModalComponent,MensagemComponent]
})
export class AppModule { }
