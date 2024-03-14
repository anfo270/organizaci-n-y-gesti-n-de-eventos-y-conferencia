class Usuario {
    constructor(
        public nombre: string,
        public correo: string,
        public contraseña: string,
        public tipo: 'organizador' | 'participante'
    ) { }
}