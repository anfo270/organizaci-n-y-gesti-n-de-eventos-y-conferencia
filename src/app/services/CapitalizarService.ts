import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Capitalizar {
    constructor() { }

    CapitalizarPrimerayMinusculas(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    CapitalizarPrimera(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

}