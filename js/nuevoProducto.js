
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
    agregarProducto();
  });

  // Agregar productos
function agregarProducto() {

    let stockGuardado = JSON.parse(localStorage.getItem("stockProductos")) || [];

    let nombre = document.getElementById('txtNombre').value;
    let descripcion = document.getElementById('txtDescripcion').value;

    let precioStr = document.getElementById('numPrecio').value;
    let precio = Number(precioStr.replace('.', ''));

    let imagen = "img/" + document.getElementById('imgImagen').files[0].name || '';
    let cantidad = document.getElementById('numCantidad').value;

    let id = stockGuardado.length > 0 ? stockGuardado[stockGuardado.length - 1].id + 1 : 1;

    let nuevoProducto = new Producto(id, nombre, descripcion, precio, imagen, cantidad);

    let existe = 0;
    stockGuardado.forEach(produ => {
      if (produ.nombre == nuevoProducto.nombre) {
        existe = 1;
      }
    });
    if (existe === 1) {
      Swal.fire({
        title: "Error",
        text: "Ya hay un Producto con este Nombre",
        icon: "error"
      })
      existe = 0;
    } else {
      stockGuardado.push(nuevoProducto);
      localStorage.setItem("stockProductos", JSON.stringify(stockGuardado));
      Swal.fire({
        title: "Producto Creado con Exito",
        text: "",
        icon: "success"
      })

      nombre = "";
      document.getElementById('txtNombre').value = "";
      descripcion = "";
      document.getElementById('txtDescripcion').value = "";
      precioStr = "";
      document.getElementById('numPrecio').value = "";
      imagen = "";
      document.getElementById('imgImagen').files[0].name = "";
      cantidad = "";
      document.getElementById('numCantidad').value = "";
    }
};