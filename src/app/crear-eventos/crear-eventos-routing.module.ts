import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearEventosPage } from './crear-eventos.page';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CrearEventosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule],

})
export class CrearEventosPageRoutingModule { }
