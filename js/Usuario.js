class Usuario {
    id;
    nombre;
    correo;
    contraseña;
    telefono;
    region;
    comuna;
    rol;

    constructor(id, nombre, correo, contraseña, telefono, region, comuna, rol){
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
        this.telefono = telefono;
        this.region = region;
        this.comuna = comuna;
        this.rol = rol;
    }
}