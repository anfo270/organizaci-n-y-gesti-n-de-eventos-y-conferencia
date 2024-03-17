import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificacionService {
    private mensajeSubject = new Subject<string>();

    mensaje$ = this.mensajeSubject.asObservable();

    constructor() { }

    enviarMensaje(mensaje: string) {
        this.mensajeSubject.next(mensaje);
    }
}
