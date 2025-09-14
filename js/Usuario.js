class Usuario {
    id;
    nombre;
    correo;
    contraseña;
    telefono;
    region;
    comuna;

    constructor(id, nombre, correo, contraseña, telefono, region, comuna){
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
        this.telefono = telefono;
        this.region = region;
        this.comuna = comuna;
    }
}