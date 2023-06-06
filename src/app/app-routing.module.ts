import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModalComponent } from './components/modal/modal.component';
import { FirstComponentComponent } from './components/first-component/first-component.component';
import { HomeComponent } from './components/home/home.component';
import { EditDataComponent } from './components/edit-data/edit-data.component';
import { DataResolver } from './components/guards/data.resolver';

const routes: Routes = [
  {path: 'modalDatas', component: ModalComponent},
  {path: 'formulario', component: FirstComponentComponent},
  {path: 'home',component: HomeComponent},
  {path: 'edit/:CPF', component: EditDataComponent, resolve: { data : DataResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
