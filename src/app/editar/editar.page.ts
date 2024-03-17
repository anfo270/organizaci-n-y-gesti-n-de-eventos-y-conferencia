import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../model/Evento';
import { LocalEventosStorageService } from '../services/localEventos-storage.service';
import { AlertaService } from '../services/AlertaService';
import { NotificacionService } from '../services/notificacion.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  eventoId: number = 0;
  evento: Evento | any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localEventosStorageService: LocalEventosStorageService,
    private alertaService: AlertaService,
    private notificacionService: NotificacionService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventoId = +params['id'];
      this.evento = this.localEventosStorageService.getEventoById(this.eventoId);
    });
  }

  async guardarCambios() {
    if (!this.evento.Titulo || !this.evento.Fecha || !this.evento.Hora || !this.evento.Lugar || !this.evento.Capacidad) {
      await this.alertaService.mostrarAlerta('Campos vacíos', 'Por favor, completa todos los campos.');
      return;
    }

    if (await this.localEventosStorageService.editarEvento(this.eventoId, this.evento)) {
      await this.alertaService.mostrarAlerta('Éxito', 'Los cambios se guardaron correctamente.');
      this.notificarParticipantesActualizados();
      this.router.navigate(['/crear-eventos']);
    } else {
      this.alertaService.mostrarAlerta('Error', 'Ocurrió un error al intentar guardar los cambios. Por favor , intenta de nuevo más tarde');
    }
  }

  cancelar() {
    this.router.navigate(['/crear-eventos']);
  }

  async notificarParticipantesActualizados() {

    const participantes = this.localStorageService.obtenerParticipantesPorEvento(this.evento.nombre);
    participantes.forEach(() => {
      this.notificacionService.enviarMensaje("El evento " + this.evento.nombre + " ha sido actualizado");
    });
  }
}
