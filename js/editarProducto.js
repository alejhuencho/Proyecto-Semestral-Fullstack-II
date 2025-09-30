
function mostrarVistaPrevia(event) {
  const archivo = event.target.files[0];

  const vistaPrevia = document.getElementById('vista-previa');

  if (archivo) {
    const lector = new FileReader();

    lector.onload = function(e) {
      vistaPrevia.src = e.target.result;
      vistaPrevia.style.display = 'block';
    };

    lector.readAsDataURL(archivo);
  }
};

document.getElementById('formulario-producto').addEventListener('submit', function(e) {
  e.preventDefault();
  actualizarProducto();
});




function actualizarProducto() {

  let produEdit = JSON.parse(localStorage.getItem("productoEdit"));
  console.log(produEdit)

  // Valor Id
  let id = produEdit[0].id;
  console.log(id)

  // Valores Nombre
  const nombre1 = document.getElementById('txtNombre').value || "";
  let nombre = produEdit[0].nombre;

  // Valores Descripcion
  const descripcion1 = document.getElementById('txtDescripcion').value || "";
  let descripcion = produEdit[0].descripcion;

  // Valores Precio
  const precioStr1 = document.getElementById('numPrecio').value || "";
  let precioNum = produEdit[0].precio;
  let precio 

  // Valores Imagen
  const imagen1 = document.getElementById('imgImagen').files[0]?.name || '';
  let imagen = produEdit[0].imagen;

  // Valores Cantidad
  const cantidad1 = document.getElementById('numCantidad').value || "";
  let cantidad = produEdit[0].cantidad;



  let stockGuardado = JSON.parse(localStorage.getItem("stockProductos")) || [];
  let existe = 0;

  stockGuardado.forEach(produ => {
    if (produ.nombre == nombre1) {
      Swal.fire({
        title: "El Producto ya existe",
        text: "Ya hay un Producto con este Nombre",
        icon: "error"
      })
      existe = 1;
    }
  });


  if(existe != 1){
    for (let i = 0; i < 6; i++) {
    // romper el ciclo en la 6ta iteracion
      if(i == 6){
        break;
      }
      // Nombre
      if(nombre1.trim() != "") {
          nombre = nombre1;
          console.log(nombre)
      }
      // Descripcion
      if(descripcion1.trim() != "") {
          descripcion = descripcion1;
      }
      // Precio
      if(precioStr1.trim() != "") {
          precio = Number(precioStr1.replace('.', ''));
      }
      // Imagen
      if(imagen1.trim() != "") {
          imagen = imagen1;
      }
      // Cantidad
      if(cantidad1.trim() != "") {
          cantidad = Number(cantidad1.replace('.', ''));
      }
    }

    stockGuardado.forEach(produ => {
      console.log(stockGuardado[0].id);
      if(produ.id === produEdit[0].id){

        stockGuardado[produEdit[0].posicion].nombre = nombre;
        stockGuardado[produEdit[0].posicion].descripcion = descripcion;
        stockGuardado[produEdit[0].posicion].precio = precio;
        stockGuardado[produEdit[0].posicion].imagen = "img/" + imagen;
        stockGuardado[produEdit[0].posicion].cantidad = cantidad;

        localStorage.setItem("stockProductos", JSON.stringify(stockGuardado));

        Swal.fire({
          title: "Producto actualizado con Exito",
          text: "",
          icon: "success"
        })
      }
    })
  }

  existe = 0;

};