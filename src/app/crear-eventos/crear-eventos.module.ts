import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearEventosPageRoutingModule } from './crear-eventos-routing.module';

import { CrearEventosPage } from './crear-eventos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearEventosPageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [CrearEventosPage]
})
export class CrearEventosPageModule { }
