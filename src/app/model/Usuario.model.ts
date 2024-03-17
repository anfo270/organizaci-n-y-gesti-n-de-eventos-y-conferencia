export interface Usuario {
    id: number;
    nombre: string,
    contraseña: string,
    tipo: 'organizador' | 'participante',
    loggeado: boolean
    EventosInscrito: string[];
}