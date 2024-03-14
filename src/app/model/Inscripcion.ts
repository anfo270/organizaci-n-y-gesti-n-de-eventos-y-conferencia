import { Evento } from './Evento';
import { Participante } from './Participante';

export class Inscripcion {
    constructor(
        public evento: Evento,
        public participante: Participante,
        public fechaInscripcion: Date
    ) { }
}
