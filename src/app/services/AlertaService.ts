import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertaService {

    constructor(private alertController: AlertController) { }

    async mostrarAlerta(header: string, message: string): Promise<void> {
        const alert = await this.alertController.create({
            header: header,
            message: message,
            buttons: ['Aceptar']
        });
        await alert.present();
    }
}
