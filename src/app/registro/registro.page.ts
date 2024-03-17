import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { Usuario } from '../model/Usuario.model';
import { AlertaService } from '../services/AlertaService';
import { Capitalizar } from '../services/CapitalizarService';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  FormularioRegistro: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router,
    private alertaService: AlertaService,
    private capitalizar: Capitalizar,
    private localStorageService: LocalStorageService
  ) {
    this.FormularioRegistro = this.fb.group({
      'Nombre': new FormControl("", Validators.required),
      'Password': new FormControl("", Validators.required),
      'ConfirmacionPassword': new FormControl("", Validators.required),
      'TipoUsuario': new FormControl("organizador", Validators.required)
    });
  }

  ngOnInit() { }

  async registrar() {
    var f = this.FormularioRegistro.value;

    // Verificar si algún campo está vacío
    if (!f.Nombre || !f.Password || !f.ConfirmacionPassword || !f.TipoUsuario) {
      const alert = await this.alertController.create({
        header: "Datos Incorrectos",
        message: "Favor de llenar todos los campos",
        buttons: ["Aceptar"]
      });
      await alert.present();
      return;
    }
    if (f.Password !== f.ConfirmacionPassword) {
      const alert = await this.alertController.create({
        header: "Contraseñas no coinciden",
        message: "Favor verificar que ambas contraseñas sean idénticas",
        buttons: ["Aceptar"]
      });
      await alert.present();
      return;
    }

    // Crear un nuevo usuario dependiendo del tipo
    let usuario: Usuario = {
      nombre: f.Nombre,
      contraseña: f.Password,
      tipo: f.TipoUsuario,
      loggeado: false,
      id: 0,
      EventosInscrito: []
    };
    usuario.nombre = this.capitalizar.CapitalizarPrimerayMinusculas(usuario.nombre);
    if (this.localStorageService.findUsuarioByName(usuario.nombre) !== null) {
      this.alertaService.mostrarAlerta("Usuario existente", "El usuario ingresado ya existe");
    } else {
      const success = await this.localStorageService.addUsuario(usuario);
      this.handleRegistrationResult(success);
    }
  }

  async handleRegistrationResult(success: boolean) {
    if (success) {
      // Mostrar mensaje de registro exitoso
      const successAlert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: '¡El usuario se ha registrado correctamente!',
        buttons: ['Aceptar']
      });
      await successAlert.present();
      this.router.navigate(['/iniciar']);
    } else {
      // Mostrar mensaje de error si falla la inserción
      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo registrar el usuario. Por favor, inténtalo de nuevo.',
        buttons: ['Aceptar']
      });
      await errorAlert.present();
    }
  }

  ionViewDidLeave() {
    this.FormularioRegistro?.reset();
    this.FormularioRegistro?.get('TipoUsuario')?.setValue('organizador');
  }
}
