let rolUser = "";

let region = "";
let comuna = "";

// Diccionario de Regiones y COmunas
let comuRegi = {
        "Metropolitana": [ "Santiago", "Las Condes", "Providencia", "Peñalolén", "Vitacura"],
        "Valparaiso": ["Valparaíso", "Viña del Mar", "Concepción", "Quilpué", "Limache"],
        "O Higgins": ["Rancagua", "San Fernando", "Pichilemu", "Colchagua", "Santa Cruz"],
        "Maule": ["Talca", "Curicó", "Linares", "Cauquenes", "Pelarco"],
        "Ñuble": ["Chillán", "Bulnes", "Yungay", "Chillán Viejo", "Yerbas Buenas"]
    };



document.getElementById('formulario-producto').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita el recargo de la página
    guardarUsuario();
});

let nombre = "";
let rut = "";
let correo = "";
let correoConfirm = "";
let contraseña = "";
let contraseñaConfirm = "";
let numero = "";



// Tomar valor de Rol Usuario
function cambUser(valor){
    const valUser = valor.value;
    if(valUser !== "NoRol"){
        rolUser = valUser;
    }
}


function cambioComuna(select){

    const valRegi = select.value;
    if(valRegi !== "Nada"){
    region = valRegi;
    document.getElementById("txtComuna1").innerHTML = comuRegi[valRegi][0];
    document.getElementById("txtComuna2").innerHTML = comuRegi[valRegi][1];
    document.getElementById("txtComuna3").innerHTML = comuRegi[valRegi][2];
    document.getElementById("txtComuna4").innerHTML = comuRegi[valRegi][3];
    document.getElementById("txtComuna5").innerHTML = comuRegi[valRegi][4];
    }
}


function valorComuna(select){
    if(region !== "Nada"){
    const valCom = select.value;
    comuna = valCom;
    let numComuna = Number(comuna);
    if(numComuna >= 1 && numComuna <= 5){
        numComuna = numComuna - 1;
        comuna = comuRegi[region][numComuna];
    }
    }
}




function guardarUsuario(){

    // USuario a Editar
    let usuEdit = JSON.parse(localStorage.getItem("usuarioEdit"))
    let existe = 0;

    //Lista de Usuarios
    let usuarioGuardado = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Insercion de valores
    // Nombre
    const nombre1 = document.getElementById('txtNombre').value;
    nombre = usuEdit[0].nombre;

    // Rut
    const rut1 = document.getElementById('txtRut').value;
    rut = usuEdit[0].nombre;

    // Correo
    const correo1 = document.getElementById('txtCorreo').value;
    correo = usuEdit[0].rut;

    // Confirmar Correo
    const correoConfirm1 = document.getElementById('txtCorreoConfirm').value;
    correoConfirm = usuEdit[0].correo;
    
    // Contraseña
    const contraseña1 = document.getElementById('txtPass').value;
    contraseña = usuEdit[0].contraseña;
    
    // Confirmar Contraseña
    const contraseñaConfirm1 = document.getElementById('txtPassConfirm').value;
    contraseñaConfirm = usuEdit[0].contraseña;

    // Numero
    const numero1 = document.getElementById('numTel').value;
    numero = usuEdit[0].telefono;

    // Rol
    rolUser = usuEdit[0].rol;

    // Region y Comuna
    let regiEdit = usuEdit[0].region;
    let comuEdit = usuEdit[0].comuna;

    
    // Verifica que no se repita el Nombre con uno ya Existente
    usuarioGuardado.forEach(us => {
        if (us.nombre == nombre1) {
            Swal.fire({
                title: "El Usuario ya existe",
                text: "Ya hay un usuario con este Nombre",
                icon: "error"
              })
            existe = 1;
        }

        if(existe != 1){
        for (let i = 0; i < 10; i++) {
        // romper el ciclo en la 6ta iteracion
            if(i == 10){
                break;
            }
            // Nombre
            if(nombre1.trim() != "") {
                nombre = nombre1;
            }
            // Rut
            if(rut1.trim() != "") {
                rut = rut1;
            }
            // Correo
            if(correo1.trim() != "") {
                correo = correo1;
            }

            // Confirmar Correo
            if(correoConfirm1.trim() != ""){
                correoConfirm = correoConfirm1;
            }

            // Contraseña
            if(contraseña1.trim() != "") {
                contraseña = contraseña1;
            }
            // Confirmar Contraseña
            if(contraseñaConfirm1.trim() != ""){
                contraseñaConfirm = contraseñaConfirm1;
            }
            // Numero
            if(numero1.trim() != "") {
                numero = numero1;
            }
            if(region !== "" || region !== "Nada"){
                regiEdit = region;
                if(comuna !== "" || comuna !== "0"){
                comuEdit = comuna;
                }
            }
            }
        }
    });
    

    // Validacion
    let resultEva = validacionEditUser(usuarioGuardado, nombre, contraseña, contraseñaConfirm, correo, correoConfirm, numero, regiEdit, comuEdit);
    if(resultEva === ""){


    usuarioGuardado.forEach(us => {
        if(us.id === usuEdit[0].id){
            // Aplica los cambios
            usuarioGuardado[usuEdit[0].id].nombre = nombre;
            usuarioGuardado[usuEdit[0].id].rut = rut;
            usuarioGuardado[usuEdit[0].id].correo = correo;
            usuarioGuardado[usuEdit[0].id].contraseña = contraseña;
            usuarioGuardado[usuEdit[0].id].telefono = numero;
            usuarioGuardado[usuEdit[0].id].rol = rolUser;
            usuarioGuardado[usuEdit[0].id].region = regiEdit;
            usuarioGuardado[usuEdit[0].id].comuna = comuEdit;

            localStorage.setItem("usuarios", JSON.stringify(usuarioGuardado));

            Swal.fire({
                title: "Usuario actualizado con Exito",
                text: "",
                icon: "success"
            })
        }
    })

    region = "Nada";
    comuna = "";
    rolUser = "NoRol";
    } else {
        Swal.fire({
            title: "Error al Ingresar Datos",
            text: resultEva,
            icon: "error"
        })
    }

}