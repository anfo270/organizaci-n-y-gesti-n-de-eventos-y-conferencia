import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../model/Usuario.model';
import { LocalStorageService } from '../services/local-storage.service';
import { AlertaService } from '../services/AlertaService';
import { Capitalizar } from '../services/CapitalizarService';
@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.page.html',
  styleUrls: ['./iniciar.page.scss'],
})
export class IniciarPage implements OnInit {
  FormularioLogin: FormGroup;

  constructor(
    private FB: FormBuilder,
    private alertaService: AlertaService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private capitalizar: Capitalizar
  ) {
    this.FormularioLogin = this.FB.group({
      Nombre: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.verificar()
  }
  verificar() {
    const VerficacionLogged = this.localStorageService.findUsuarioByLogged();
    if (VerficacionLogged !== null) {
      this.router.navigate(['/crear-eventos']);
    }
  }
  async inicio() {

    const f = this.FormularioLogin.value;
    f.Nombre = this.capitalizar.CapitalizarPrimerayMinusculas(f.Nombre);
    const usuarios: Usuario[] = this.localStorageService.getUsuarios();

    if (usuarios.length > 0) {
      const usuario: Usuario | undefined = usuarios.find(u => u.nombre === f.Nombre);

      if (!f.Nombre || !f.Password) {
        await this.alertaService.mostrarAlerta('Usuario o Contraseña vacíos', 'Favor de ingresar el usuario y contraseñas correctas');
        return;
      }

      if (usuario && usuario.contraseña === f.Password) {
        console.log('Ingresando');
        localStorage.setItem('ingresado', 'true');
        if (this.localStorageService.setLoggeado(usuario.nombre, true) == false) {
          await this.alertaService.mostrarAlerta('Problemas de Inicio', 'Favor de verificar con el admmistrador de sistema');
        }
        await this.alertaService.mostrarAlerta('Usuario correcto', 'Bienvenido');
        this.router.navigate(['/crear-eventos']);
      } else {
        await this.alertaService.mostrarAlerta('Usuario o Contraseña no coinciden', 'Favor verificar que el nombre de usuario y la contraseña coincidan');
      }
    } else {
      await this.alertaService.mostrarAlerta('Usuario no existe', 'Favor verificar que el usuario ingresado exista');
    }
  }


}
