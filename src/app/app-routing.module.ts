import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModalComponent } from './components/modal/modal.component';
import { FirstComponentComponent } from './components/first-component/first-component.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'modalDatas', component: ModalComponent},
  {path: 'formulario', component: FirstComponentComponent},
  {path: 'home',component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
