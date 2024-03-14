import { Injectable } from '@angular/core';
import { Organizer } from '../model/Organizador';
import { Participant } from '../model/Participante';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private organizersKey = 'organizers';
    private participantsKey = 'participants';

    constructor(private alertController: AlertController) { }

    // Métodos para Organizadores
    async saveOrganizers(organizers: Organizer[]): Promise<boolean> {
        localStorage.setItem(this.organizersKey, JSON.stringify(organizers));
        return true;
    }

    getOrganizers(): Organizer[] {
        const organizersString = localStorage.getItem(this.organizersKey);
        return organizersString ? JSON.parse(organizersString) : [];
    }

    // Métodos para Participantes
    async saveParticipants(participants: Participant[]): Promise<boolean> {
        localStorage.setItem(this.participantsKey, JSON.stringify(participants));
        return true;
    }

    getParticipants(): Participant[] {
        const participantsString = localStorage.getItem(this.participantsKey);
        return participantsString ? JSON.parse(participantsString) : [];
    }
}
