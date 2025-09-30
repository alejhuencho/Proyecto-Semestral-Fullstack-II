var stockGuardado = JSON.parse(localStorage.getItem("stockProductos"))
    

function cargarLista() {
    if(!stockGuardado || stockGuardado.length === 0){
        Swal.fire({
        title: "No hay Productos para Listar",
        text: "Quiere agregar Productos?",
        icon: "error",
        confirmButtonText: "SI",
        showCancelButton: true,
        cancelButtonText: "NO"
        }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            location.href='nuevoProducto.html'
        }
    });
    } else {
        var tabla = "<table>"
        tabla += "<thead>"
        tabla += "<t>"
        tabla += "<th scope=col>Id</th> <th scope=col>Nombre</th> <th scope=col>Descripcion</th> <th scope=col>Precio</th> <th scope=col>Cantidad</th> <th scope=col>Imagen</th>"
        tabla +="</tr>"
        tabla += "</thead>"
        tabla += "<tbody>"
        stockGuardado.forEach(item => {
            tabla += "<tr>"
            tabla += "<th scope=row>" + item.id + "</th>"
            tabla += "<td>" + item.nombre + "</td>"
            tabla += "<td>" + item.descripcion + "</td>"
            tabla += "<td>" + item.precio + "</td>"
            tabla += "<td>" + item.cantidad + "</td>"
            tabla += "<td> <img src='" + item.imagen + "' width=150px height=100px></td>"
            tabla += "<td> <input type='button' value='Descripcion Producto' onclick='editProdu(" + item.id + ", " + 1 + ")'> </td>"
            tabla += "<td> <input type='button' value='Editar Producto' onclick='editProdu(" + item.id + ", " + 2 + ")'> </td>"
            tabla += "<td> <input type='button' value='Eliminar Producto' onclick='editProdu(" + item.id + ", " + 3 + ")'> </td>"
            tabla += "</tr>"
        })
        tabla += "</tbody>"
        tabla += "</table>"
        tabla += "<input type='button' value='Nuevo Producto' onclick='nuevoProdu( " + 0 + ")'>"
        document.getElementById("tablaProductos").innerHTML = tabla
    }
}

function nuevoProdu(val){
    if(val === 0){
        location.href='nuevoProducto.html'
    }
}

function eliminar(posiProduElim) {
    if (confirm("¿Desea Eliminar al Usuario?")) {
        stockGuardado.splice(posiProduElim, 1)
        localStorage.setItem("stockProductos", JSON.stringify(stockGuardado))
        cargarLista()
    }
}

function editProdu(posiProducto, val){
    let posicionProducto = 0;
    let countPosi = 0;
    stockGuardado.forEach(item => {
        posicionProducto = countPosi;
        if(item.id === posiProducto){
            let objetoProduEdit = new Object({id: item.id, nombre: item.nombre, descripcion: item.descripcion, precio: item.precio, imagen: item.imagen, cantidad: item.cantidad, posicion: countPosi})
            let listProduEdit = [
                objetoProduEdit
            ]
            localStorage.setItem("productoEdit", JSON.stringify(listProduEdit));
        }
        countPosi ++;
    })
    countPosi = 0;
    if(val === 1){
        // location.href='editarProducto.html'
    }else if(val === 2){
        location.href='editarProducto.html'
    } else if(val === 3){
        eliminar(posicionProducto)
    }
}