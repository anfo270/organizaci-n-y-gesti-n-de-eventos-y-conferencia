import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertaService } from '../services/AlertaService';
import { LocalEventosStorageService } from '../services/localEventos-storage.service';
import { Capitalizar } from '../services/CapitalizarService';

@Component({
  selector: 'app-registrar-evento',
  templateUrl: './registrar-evento.page.html',
  styleUrls: ['./registrar-evento.page.scss'],
})
export class RegistrarEventoPage implements OnInit {
  FormularioEvento: FormGroup;
  fechaActual: Date = new Date();
  fechaISO: string = this.fechaActual.toISOString().split('T')[0];
  horaActual: string = this.fechaActual.toTimeString().split(' ')[0];
  LocalEventosStorageService: any;
  constructor(
    private alertservice: AlertaService,
    private router: Router,
    public fb: FormBuilder,
    private capitalizar: Capitalizar,
    private localEventosStorageService: LocalEventosStorageService
  ) {
    this.FormularioEvento = this.fb.group({
      'Titulo': new FormControl('', Validators.required),
      'Fecha': new FormControl('', Validators.required),
      'Hora': new FormControl('', Validators.required),
      'Lugar': new FormControl('', Validators.required),
      'Descripcion': new FormControl('', Validators.required),
      'Capacidad': new FormControl(0, Validators.required)
    })
  }

  ngOnInit() {
  }

  async agregar() {
    var f = this.FormularioEvento.value;
    if (this.FormularioEvento.invalid) {
      this.alertservice.mostrarAlerta("Campos Vacios", "Favor de rellenar todos lo campos");
      return;
    } else if (f.Capacidad <= 0) {
      this.alertservice.mostrarAlerta("Error en la capacidad", "La capacidad debe ser mayor a cero");
      return;
    } else if (f.Fecha <= this.fechaISO) {
      this.alertservice.mostrarAlerta("Error en la Fecha", "La fecha debe ser mayor 2 dias del : " + this.fechaISO);
      return;
    }
    //Si todo esta bien
    f.Titulo = this.capitalizar.CapitalizarPrimera(f.Titulo);// Acomodar titulo  al principio
    f.Descripcion = this.capitalizar.CapitalizarPrimera(f.Descripcion);//Acomodar  descripción al inicio
    if (await this.localEventosStorageService.agregarEvento(f)) {
      this.alertservice.mostrarAlerta("Agregado", "Se agrego con exito el nuevo evento llamado: " + f.Titulo)
      this.router.navigate(['/crear-eventos'])

    }
  }
  ionViewDidLeave() {
    this.FormularioEvento?.reset();
  }
}
