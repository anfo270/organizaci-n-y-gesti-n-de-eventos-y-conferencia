import { Injectable } from '@angular/core';
import { Encuesta } from '../model/Encuesta';
@Injectable({
    providedIn: 'root'
})
export class LocalEncuestaStorageService {
    private encuestasKey = 'Encuestas';

    constructor() { }

    getAllEncuestas(): Encuesta[] {
        const encuestasString = localStorage.getItem(this.encuestasKey);
        return encuestasString ? JSON.parse(encuestasString) : [];
    }

    saveEncuestas(encuestas: Encuesta[]): void {
        localStorage.setItem(this.encuestasKey, JSON.stringify(encuestas));
    }

    addEncuesta(encuesta: Encuesta): void {
        const encuestas = this.getAllEncuestas();
        encuestas.push(encuesta);
        this.saveEncuestas(encuestas);
    }
}
