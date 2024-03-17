import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPage } from './editar.page';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: EditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class EditarPageRoutingModule { }
