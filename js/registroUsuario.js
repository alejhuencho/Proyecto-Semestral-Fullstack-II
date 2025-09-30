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
    e.preventDefault();
    guardarUsuario();
});

let nombre = "";
let correo = "";
let correoConfirm = "";
let contraseña = "";
let contraseñaConfirm = "";
let numero = "";



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

    //Lista de Usuarios
    let usuarioGuardado = JSON.parse(localStorage.getItem("usuarios")) || [];

    nombre = document.getElementById('txtNombre').value;
    rut = document.getElementById('txtRut').value;
    correo = document.getElementById('txtCorreo').value;
    correoConfirm = document.getElementById('txtCorreoConfirm').value;
    contraseña = document.getElementById('txtPass').value;
    contraseñaConfirm = document.getElementById('txtPassConfirm').value;
    numero = document.getElementById('numTel').value; 

    const id = usuarioGuardado.length > 0 ? usuarioGuardado[usuarioGuardado.length - 1].id + 1 : 1;

    // Validacion
    let resultadoValidacion = "";
    resultadoValidacion = validacioneRegistroUsuario(usuarioGuardado, nombre, rut, contraseña, contraseñaConfirm, correo, correoConfirm, numero, region, comuna);
    if(resultadoValidacion === ""){
        let nuevaUsuario = new Usuario(id, rut, nombre, correo, contraseña, numero, region, comuna, "Usuario")
        usuarioGuardado.push(nuevaUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarioGuardado));

        console.log("El Usuario Es : "+nombre+' '+correo+' '+correoConfirm+' '+ contraseña+' '+ contraseñaConfirm+' '+ numero+' '+ region+' '+ comuna)
        region = "Nada";
        comuna = "";

        document.getElementById('txtNombre').value = "";
        document.getElementById('txtRut').value = "";
        document.getElementById('txtCorreo').value = "";
        document.getElementById('txtCorreoConfirm').value = "";
        document.getElementById('txtPass').value = "";
        document.getElementById('txtPassConfirm').value = "";
        document.getElementById('numTel').value = ""; 

        location.href='home.html'
    } else {
        Swal.fire({
        title: "Datos Incorrectos",
        text: resultadoValidacion,
        icon: "error",
        })
    }

}