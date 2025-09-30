var usuarioGuardado = JSON.parse(localStorage.getItem("usuarios"))
    

function cargarLista() {
    if(!usuarioGuardado || usuarioGuardado.length === 0){
        Swal.fire({
        title: "No hay Usuarios para Listar",
        text: "Quiere agregar Usuarios?",
        icon: "error",
        confirmButtonText: "SI",
        showCancelButton: true,
        cancelButtonText: "NO"
        }).then((result) => {
        if (result.isConfirmed) {
            location.href='nuevoUsuario.html'
        }
    });
    } else {
        var tabla = "<table class=table table-dark>"
        tabla += "<thead>"
        tabla += "<t>"
        tabla += "<th scope=col>Id</th> <th scope=col>Nombre</th> <th scope=col>Rut</th> <th scope=col>Correo</th> <th scope=col>Telefono</th> <th scope=col>Region</th> <th scope=col>Comuna</th> <th scope=col>Rol</th>"
        tabla +="</tr>"
        tabla += "</thead>"
        tabla += "<tbody>"
        usuarioGuardado.forEach(item => {
            tabla += "<tr>"
            tabla += "<th scope=row>" + item.id + "</th>"
            tabla += "<td>" + item.nombre + "</td>"
            tabla += "<td>" + item.correo + "</td>"
            tabla += "<td>" + item.rut + "</td>"
            tabla += "<td>" + item.telefono + "</td>"
            tabla += "<td>" + item.region + "</td>"
            tabla += "<td>" + item.comuna + "</td>"
            tabla += "<td>" + item.rol + "</td>"
            tabla += "<td> <input type='button' value='Descripcion Usuario' onclick='btnResp(" + item.id + ", " + 1 + ")'> </td>"
            tabla += "<td> <input type='button' value='Editar Usuario' onclick='btnResp(" + item.id + ", " + 2 + ")'> </td>"
            tabla += "<td> <input type='button' value='Eliminar Usuario' onclick='btnResp(" + item.id + ", " + 3 + ")'> </td>"
            tabla += "</tr>"
        })
        tabla += "</tbody>"
        tabla += "</table>"
        tabla += "<input type='button' value='Nuevo Usuario' onclick='nuevoUser( " + 0 + ")'>"
        document.getElementById("tablaUsuarios").innerHTML = tabla
    }
}

function nuevoUser(val){
    if(val === 0){
        location.href='nuevoUsuario.html'
    }
}

function eliminar(posiUsElim) {
    if (confirm("¿Desea Eliminar al Usuario?")) {
        usuarioGuardado.splice(posiUsElim, 1)
        localStorage.setItem("usuarios", JSON.stringify(usuarioGuardado))
        cargarLista()
    }
}

function btnResp(idUser, val){
    let posicionUsuario = 0;
    let countPosi = 0;
    usuarioGuardado.forEach(item => {
        posicionUsuario = countPosi;
        if(item.id === idUser){
            let objetoUsuarioEdit = new Object({id: item.id, rut: item.rut, nombre: item.nombre, correo: item.correo, contraseña: item.contraseña, telefono: item.telefono, region: item.region, comuna: item.comuna, rol: item.rol, posicion: countPosi})
            let listUserEdit = [
                objetoUsuarioEdit
            ]
            localStorage.setItem("usuarioEdit", JSON.stringify(listUserEdit));
        }
        countPosi ++;
    })
    countPosi = 0;
    if(val === 1){
        // location.href='editarProducto.html'
    } else if(val === 2){
        location.href='editarUsuario.html'
    } else if(val === 3){
        eliminar(posicionUsuario)
    }
}