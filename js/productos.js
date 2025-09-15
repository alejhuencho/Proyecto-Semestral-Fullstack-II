function agregarProducto(id, cantidad) {
    if (cantidad <= 0 || isNaN(cantidad)) {
        console.error("La cantidad debe ser un número positivo.");
        return;
    }

    const productosEnStorage = JSON.parse(localStorage.getItem("productos"));
    const productoSeleccionado = productosEnStorage.find(p => p.id === id);

    if (!productoSeleccionado) {
        console.error("Producto no encontrado.");
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let productoExistente = carrito.find(item => item.id === productoSeleccionado.id);

    if (productoExistente) {
        productoExistente.cantidad += cantidad;
        productoExistente.total = productoExistente.precio * productoExistente.cantidad;
    } else {
        const nuevoProducto = {
            id: productoSeleccionado.id,
            nombre: productoSeleccionado.nombre,
            precio: productoSeleccionado.precio,
            cantidad: cantidad,
            total: productoSeleccionado.precio * cantidad,
            imagen: productoSeleccionado.imagen
        };
        carrito.push(nuevoProducto);
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(`Se agregaron ${cantidad} unidades de ${productoSeleccionado.nombre} al carrito.`);

    if (typeof actualizarTotalesCarrito !== 'undefined') {
        actualizarTotalesCarrito();
    }
    
    return productoSeleccionado.nombre;  
}

function actualizarTotalesCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const carritoIcons = document.querySelectorAll('a[href="carrito.html"]');
    carritoIcons.forEach(icon => {
        const span = icon.querySelector('span');
        if (span) {
            span.textContent = `🛒 Carrito (${totalCantidad})`;
        } else {
            icon.textContent = `🛒 Carrito (${totalCantidad})`;
        }
    });
}

function buscarEnTiempoReal() {
    const input = document.getElementById('search-input');
    const sugerenciasContainer = document.getElementById('sugerencias-container');
    const query = input.value.trim().toLowerCase();

    if (query.length === 0) {
        sugerenciasContainer.innerHTML = '';
        sugerenciasContainer.style.display = 'none';
        return;
    }

    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const resultados = productos.filter(p => 
        p.nombre.toLowerCase().includes(query)
    );

    let htmlSugerencias = '';
    if (resultados.length > 0) {
        resultados.forEach(p => {
            let enlacePagina = '';
            // Asegúrate de que los nombres de los archivos coincidan
            if (p.id === 1) enlacePagina = 'detalle_catan.html';
            else if (p.id === 2) enlacePagina = 'detalle_carcassonne.html';
            else if (p.id === 3) enlacePagina = 'detalle_play5.html';
            else if (p.id === 4) enlacePagina = 'detalle_control_xbox.html';
            else if (p.id === 5) enlacePagina = 'detalle_mouse_logitech.html';
            else if (p.id === 6) enlacePagina = 'detalle_ASUS_ROG.html';
            else if (p.id === 7) enlacePagina = 'detalle_silla_omen.html';
            else if (p.id === 8) enlacePagina = 'detalle_Steam_Deck.html';
            else if (p.id === 9) enlacePagina = 'detalle_Deep_Rock.html';
            else if (p.id === 10) enlacePagina = 'detalle_Exploding_Kittens.html';
            else if (p.id === 11) enlacePagina = 'detalle_gundam.html';
            else if (p.id === 12) enlacePagina = 'detalle_pokemon.html';
            
            htmlSugerencias += `<a href="${enlacePagina}" class="list-group-item list-group-item-action d-flex align-items-center">
                                    <img src="${p.imagen}" alt="${p.nombre}" style="width: 40px; height: 40px; margin-right: 10px; object-fit: contain;">
                                    ${p.nombre}
                                </a>`;
        });
        sugerenciasContainer.innerHTML = htmlSugerencias;
        sugerenciasContainer.style.display = 'block';
    } else {
        sugerenciasContainer.innerHTML = `<a class="list-group-item disabled">No se encontraron resultados</a>`;
        sugerenciasContainer.style.display = 'block';
    }
}

const productos = [
    {
        id: 1,
        nombre: "Catán",
        descripcion: "Juego de Mesa Básico",
        imagen: "img/catan.jpg",
        precio: 29990
    },
    {
        id: 2,
        nombre: "Carcassonne",
        descripcion: "Juego de Mesa Básico 2da Edición",
        imagen: "img/Carcassonne.jpg",
        precio: 26990
    },
    {
        id: 3,
        nombre: "Play 5 (PS5 Slim Digital)",
        descripcion: "Consola PS5 Slim Digital",
        imagen: "img/play5.jpg",
        precio: 589990
    },
    {
        id: 4,
        nombre: "Control Xbox",
        descripcion: "Control Inalámbrico",
        imagen: "img/Control_Xbox.jpg",
        precio: 59990
    },
    {
        id: 5,
        nombre: "Mouse Logitech G502 Hero",
        descripcion: "Mouse Gamer Logitech G502 HERO",
        imagen: "img/mouse_Logitech_G502_HERO.jpg",
        precio: 48280
    },
    {
        id: 6,
        nombre: "ASUS ROG Strix G15 G513RC",
        descripcion: "Laptop Gamer",
        imagen: "img/laptop.jpg",
        precio: 849990
    },
    {
        id: 7,
        nombre: "Silla Gamer Omen",
        descripcion: "Silla Gamer Omen",
        imagen: "img/silla_omen.jpg",
        precio: 249990
    },
    {
        id: 8,
        nombre: "Steam Deck",
        descripcion: "Consola Portátil",
        imagen: "img/Steam-Deck-2.jpg",
        precio: 499990
    },
    {
        id: 9,
        nombre: "Deep Rock Galactic (juego de mesa)",
        descripcion: "Juego de mesa",
        imagen: "img/pokemon.jpg",
        precio: 39990
    },
    {
        id: 10,
        nombre: "Exploding Kittens (juego de mesa)",
        descripcion: "Juego de mesa",
        imagen: "img/gato_bomba.jpeg",
        precio: 20990
    },
    {
        id: 11,
        nombre: "Gundam Barbatos model kit",
        descripcion: "Model kit",
        imagen: "img/gundam.jpg",
        precio: 39990
    },
    {
        id: 12,
        nombre: "Pokémon Espada y Escudo (juego)",
        descripcion: "Juego de Nintendo Switch",
        imagen: "img/pokemon.jpg",
        precio: 39990
    }
];

localStorage.setItem("productos", JSON.stringify(productos));