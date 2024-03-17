import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'iniciar',
    pathMatch: 'full'
  },
  {
    path: 'iniciar',
    loadChildren: () => import('./iniciar/iniciar.module').then(m => m.IniciarPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'crear-eventos',
    loadChildren: () => import('./crear-eventos/crear-eventos.module').then(m => m.CrearEventosPageModule)
  },

  {
    path: 'registrar-evento',
    loadChildren: () => import('./registrar-evento/registrar-evento.module').then(m => m.RegistrarEventoPageModule)
  },
  {
    path: 'editar/:id',
    loadChildren: () => import('./editar/editar.module').then(m => m.EditarPageModule)
  },
  {
    path: 'detalles/:id',
    loadChildren: () => import('./detalles/detalles.module').then(m => m.DetallesPageModule)
  },
  {
    path: 'encuesta/:id',
    loadChildren: () => import('./encuesta/encuesta.module').then(m => m.EncuestaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules },)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
