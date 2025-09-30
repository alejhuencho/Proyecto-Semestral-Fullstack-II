class Usuario {
    id;
    rut;
    nombre;
    correo;
    contraseña;
    telefono;
    region;
    comuna;
    rol;

    constructor(id, rut, nombre, correo, contraseña, telefono, region, comuna, rol){
        this.id = id;
        this.rut = rut;
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
        this.telefono = telefono;
        this.region = region;
        this.comuna = comuna;
        this.rol = rol;
    }
}