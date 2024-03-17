import { Injectable } from '@angular/core';
import { Evento } from '../model/Evento';

@Injectable({
    providedIn: 'root'
})
export class LocalEventosStorageService {
    private EventosKey = 'Eventos';

    constructor() { }

    private generateUniqueId(): number {
        let eventosAlmacenados = this.getEventos();
        const IdEvent = eventosAlmacenados.length > 0 ? eventosAlmacenados[eventosAlmacenados.length - 1].Id : 0;
        return IdEvent + 1;
    }

    async agregarEvento(evento: Evento): Promise<boolean> {
        let eventos = this.getEventos();
        evento.Id = this.generateUniqueId();
        evento.Inscriptos = 0; // Inicializamos Inscriptos en 0
        eventos.push(evento);
        await this.saveEventos(eventos);
        return true; // Devolvemos true después de agregar el evento
    }

    async editarEvento(eventoId: number, eventoActualizado: Evento): Promise<boolean> {
        let eventos = this.getEventos();
        const index = eventos.findIndex(evento => evento.Id === eventoId);
        if (index !== -1) {
            eventos[index] = eventoActualizado;
            return this.saveEventos(eventos);
        }
        return false;
    }

    async borrarEvento(eventoId: number): Promise<boolean> {
        let eventos = this.getEventos();
        const index = eventos.findIndex(evento => evento.Id === eventoId);
        if (index !== -1) {
            eventos.splice(index, 1);
            await this.saveEventos(eventos);
            return true; // Devolvemos true después de borrar el evento
        }
        return false; // Devolvemos false si no se encontró el evento
    }

    public getEventos(): Evento[] {
        const eventosString = localStorage.getItem(this.EventosKey);
        return eventosString ? JSON.parse(eventosString) : [];
    }

    private async saveEventos(eventos: Evento[]): Promise<boolean> {
        localStorage.setItem(this.EventosKey, JSON.stringify(eventos));
        return true;
    }

    public getEventoById(eventoId: number): Evento | null {
        const eventos = this.getEventos();
        return eventos.find(evento => evento.Id === eventoId) || null;
    }
    public inscribirPersona(eventoId: number): boolean {
        const eventos = this.getEventos();
        const index = eventos.findIndex(evento => evento.Id === eventoId);
        if (index !== -1) {
            eventos[index].Inscriptos++;
            this.saveEventos(eventos);
            return true;
        }
        return false;
    }

    public cancelarInscripcion(eventoId: number): boolean {
        const eventos = this.getEventos();
        const index = eventos.findIndex(evento => evento.Id === eventoId);
        if (index !== -1 && eventos[index].Inscriptos > 0) {
            eventos[index].Inscriptos--;
            this.saveEventos(eventos);
            return true;

        }
        return false;
    }
}
