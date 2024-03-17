import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarEventoPageRoutingModule } from './registrar-evento-routing.module';

import { RegistrarEventoPage } from './registrar-evento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarEventoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrarEventoPage]
})
export class RegistrarEventoPageModule { }
