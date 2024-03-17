import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Evento } from '../model/Evento';
import { Router } from '@angular/router';
import { LocalEventosStorageService } from '../services/localEventos-storage.service';
import { AlertaService } from '../services/AlertaService';
@Component({
  selector: 'app-crear-eventos',
  templateUrl: './crear-eventos.page.html',
  styleUrls: ['./crear-eventos.page.scss'],
})
export class CrearEventosPage implements OnInit {
  usuario: any; // Define la propiedad usuario

  eventos: Evento[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private localEventosStorageService: LocalEventosStorageService,
    private alertaService: AlertaService
  ) { }

  ngOnInit() {
    // Obtener el usuario y asignarlo a la propiedad usuario
    this.ionViewWillEnter();
    this.usuario = this.localStorageService.findUsuarioByLogged();
    if (!this.usuario) {
      this.router.navigate(['/iniciar']);
    }
  }

  ionViewWillEnter() {
    this.eventos = this.localEventosStorageService.getEventos();
    this.usuario = this.localStorageService.findUsuarioByLogged();
  }

  cerrarSesion() {
    this.localStorageService.setLoggeado(this.usuario.nombre, false);
    this.router.navigate(['/iniciar']);
  }

  agregarEvento() {
    this.router.navigate(['/registrar-evento']);
  }

  editar(eventoId: number) {
    this.router.navigate(['/editar', eventoId]);
  }

  detalles(eventoId: number) {
    this.router.navigate(['/detalles', eventoId]);
  }

  async borrar(eventoId: number) {
    if (await this.localEventosStorageService.borrarEvento(eventoId)) {
      this.alertaService.mostrarAlerta("Evento Borrado", "El evento fue borrado exitosamente");
      this.ionViewWillEnter();
    }
  }
  esOrganizador(): boolean {
    return this.usuario !== null && this.usuario.tipo === 'organizador';
  }
  esParticipante(): boolean {
    return this.usuario !== null && this.usuario.tipo === 'participante';
  }
  completo(evento: Evento): boolean {
    return evento?.Capacidad === evento?.Inscriptos;
  }
}
