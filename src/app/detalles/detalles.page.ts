import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { LocalEventosStorageService } from '../services/localEventos-storage.service';
import { Evento } from '../model/Evento';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  evento: Evento | null = null;
  myAngularxQrCode: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private alertController: AlertController,
    private localEventosStorageService: LocalEventosStorageService
  ) { this.myAngularxQrCode = 'Your QR code data string'; }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  esOrganizador(): boolean {
    const usuario = this.localStorageService.getUsuario();
    return usuario !== null && usuario.tipo === 'organizador';
  }

  esParticipante(): boolean {
    const usuario = this.localStorageService.getUsuario();
    return usuario !== null && usuario.tipo === 'participante';
  }

  async editarEvento() {
    this.router.navigate(['/editar', this.evento?.Id]);
  }

  async inscribirse() {
    const alert = await this.alertController.create({
      header: 'Inscripción',
      message: '¿Estás seguro de que quieres inscribirte en este evento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Inscribirse',
          handler: () => {
            const usuarioNombre = this.localStorageService.findUsuarioByLogged()?.nombre;
            const eventoTitulo = this.evento?.Titulo.toString();
            if (usuarioNombre !== undefined && eventoTitulo !== undefined) {
              this.localStorageService.actualizarEventosInscritos(usuarioNombre, eventoTitulo);
            }
            const eventoId = this.evento?.Id
            if (eventoId !== undefined) {
              this.localEventosStorageService.inscribirPersona(eventoId);
              this.ionViewWillEnter();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async cancelarInscripcion() {
    const alert = await this.alertController.create({
      header: 'Cancelar inscripción',
      message: '¿Estás seguro de que quieres cancelar tu inscripción en este evento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cancelar inscripción',
          handler: () => {
            const usuarioNombre = this.localStorageService.findUsuarioByLogged()?.nombre;
            const eventoTitulo = this.evento?.Titulo.toString();
            if (usuarioNombre !== undefined && eventoTitulo !== undefined) {
              this.localStorageService.cancelarInscripcion(usuarioNombre, eventoTitulo);
              const eventoId = this.evento?.Id
              if (eventoId !== undefined) {
                this.localEventosStorageService.cancelarInscripcion(eventoId);
                this.ionViewWillEnter();
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }

  estaInscrito(evento: Evento | null): boolean {
    if (!evento) {
      return false;
    }

    const usuario = this.localStorageService.findUsuarioByLogged();
    if (!usuario || !usuario.EventosInscrito) {
      return false;
    }

    return usuario.EventosInscrito.includes(evento.Titulo.toString());
  }

  goBack() {
    this.router.navigate(['/']);
  }
  ionViewWillEnter() {
    this.route.params.subscribe(params => {
      const eventoId = +params['id'];
      this.evento = this.localEventosStorageService.getEventoById(eventoId);
    });
  }
  completo() {
    return this.evento?.Capacidad === this.evento?.Inscriptos;
  }
  generateQRValue(): string {
    const usuario = this.localStorageService.findUsuarioByLogged();
    if (usuario && this.estaInscrito(this.evento)) {
      return `ID de asistencia: ${usuario.id}`;
    } else {
      return '';
    }
  }
  eventoHaPasado(evento: Evento): boolean {
    const fechaEvento = new Date(evento.Fecha);
    const fechaActual = new Date();
    return fechaEvento < fechaActual;
  }
  irAEncuesta(eventoid: number) {
    this.router.navigate(['/encuesta', eventoid]);
  }
}
