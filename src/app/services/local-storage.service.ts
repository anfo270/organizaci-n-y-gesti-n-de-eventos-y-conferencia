import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario.model';
import { AlertaService } from './AlertaService';
@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private usuariosKey = 'usuarios';

    constructor(
        private alertaService: AlertaService
    ) { }
    private generateUniqueId(): number {
        const usuarios = this.getUsuarios();
        const lastUserId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id : 0;
        return lastUserId + 1;
    }
    async addUsuario(usuario: Usuario): Promise<boolean> {
        let usuarios = this.getUsuarios();
        usuario.id = this.generateUniqueId();
        usuarios.push(usuario);
        return this.saveUsuarios(usuarios);
    }

    private async saveUsuarios(usuarios: Usuario[]): Promise<boolean> {
        localStorage.setItem(this.usuariosKey, JSON.stringify(usuarios));
        return true;
    }

    public getUsuarios(): Usuario[] {
        const usuariosString = localStorage.getItem(this.usuariosKey);
        return usuariosString ? JSON.parse(usuariosString) : [];
    }
    public getUsuario(): Usuario | null {
        const usuariosString = localStorage.getItem(this.usuariosKey);
        const usuarios: Usuario[] = usuariosString ? JSON.parse(usuariosString) : [];
        return usuarios.find(usuario => usuario.loggeado === true) || null;
    }
    public setLoggeado(nombre: string, loggeado: boolean): boolean {
        const usuarios = this.getUsuarios();
        const usuarioIndex = usuarios.findIndex(u => u.nombre === nombre);
        if (usuarioIndex !== -1) {
            usuarios[usuarioIndex].loggeado = loggeado;
            localStorage.setItem(this.usuariosKey, JSON.stringify(usuarios));
            return true;
        }
        return false;
    }

    public findUsuarioByName(nombre: string): Usuario | null {
        const usuariosString = localStorage.getItem(this.usuariosKey);
        const usuarios: Usuario[] = usuariosString ? JSON.parse(usuariosString) : [];
        return usuarios.find(usuario => usuario.nombre === nombre) || null;
    }
    public findUsuarioById(id: number): Usuario | null {
        const usuariosString = localStorage.getItem(this.usuariosKey);
        const usuarios: Usuario[] = usuariosString ? JSON.parse(usuariosString) : [];
        return usuarios.find(usuario => usuario.id === id) || null; // Busca el usuario por nid
    }
    public findUsuarioByLogged(): Usuario | null {
        const usuariosString = localStorage.getItem(this.usuariosKey);
        const usuarios: Usuario[] = usuariosString ? JSON.parse(usuariosString) : [];
        return usuarios.find(usuario => usuario.loggeado === true) || null;
    }
    public actualizarEventosInscritos(nombreUsuario: string, eventoInscrito: string): boolean {
        const usuarios = this.getUsuarios();
        const usuarioIndex = usuarios.findIndex(u => u.nombre === nombreUsuario);
        if (usuarioIndex !== -1) {
            if (!usuarios[usuarioIndex].EventosInscrito.includes(eventoInscrito)) {
                usuarios[usuarioIndex].EventosInscrito.push(eventoInscrito);
                localStorage.setItem(this.usuariosKey, JSON.stringify(usuarios));
                return true;
            } else {
                this.alertaService.mostrarAlerta('Ya estás inscrito a este evento', 'En este evento ya estas inscrito');
                return false;
            }
        }
        return false;
    }

    public cancelarInscripcion(nombreUsuario: string, eventoInscrito: string): boolean {
        const usuarios = this.getUsuarios();
        const usuarioIndex = usuarios.findIndex(u => u.nombre === nombreUsuario);
        if (usuarioIndex !== -1) {
            const eventosInscritosIndex = usuarios[usuarioIndex].EventosInscrito.indexOf(eventoInscrito);
            if (eventosInscritosIndex !== -1) {
                usuarios[usuarioIndex].EventosInscrito.splice(eventosInscritosIndex, 1);
                localStorage.setItem(this.usuariosKey, JSON.stringify(usuarios));
                return true;
            } else {
                this.alertaService.mostrarAlerta('No estás inscrito a este evento', 'No estás inscrito a este evento');
                return false;
            }
        }
        return false;
    }
    public obtenerParticipantesPorEvento(eventoNombre: string): Usuario[] {
        const usuariosString = localStorage.getItem(this.usuariosKey);
        const usuarios: Usuario[] = usuariosString ? JSON.parse(usuariosString) : [];
        const participantes: Usuario[] = usuarios.filter(usuario =>
            usuario.EventosInscrito && usuario.EventosInscrito.includes(eventoNombre)
        );

        return participantes;
    }
}
