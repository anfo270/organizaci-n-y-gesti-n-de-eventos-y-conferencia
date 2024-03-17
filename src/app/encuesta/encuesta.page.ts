
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Encuesta } from '../model/Encuesta';
import { LocalEncuestaStorageService } from '../services/localEncuesta.storage.services';
@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage implements OnInit {
  eventId: number | undefined;
  encuesta: Encuesta = {
    eventId: 0,
    calificacion: 0,
    aspectosGustados: '',
    aspectosMejorar: ''
  };

  constructor(
    private route: ActivatedRoute,
    private encuestaStorageService: LocalEncuestaStorageService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventId = +params['idEvento'];
      this.encuesta.eventId = this.eventId ?? 0;
    });
  }

  submitEncuesta() {
    this.encuestaStorageService.saveEncuestas([this.encuesta]);
    this.encuesta = {
      eventId: this.eventId ?? 0,
      calificacion: 0,
      aspectosGustados: '',
      aspectosMejorar: ''
    };
  }
}
