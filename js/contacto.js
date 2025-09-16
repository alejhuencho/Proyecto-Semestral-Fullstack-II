// Tu clase FormularioContacto
class FormularioContacto {
    id;
    nombre;
    email;
    mensaje;

    constructor(id, nombre, email, mensaje) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.mensaje = mensaje;
    }
}

// Función para manejar el envío del formulario
function enviarFormulario(event) {
    event.preventDefault(); 
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('correo').value; 
    const mensaje = document.getElementById('mensaje').value;

    if (nombre.trim() === '' || email.trim() === '' || mensaje.trim() === '') {
        alert('Por favor, completa todos los campos.');
        return; 
    }

    //-------------- aumento +1 id 
    let nextId = 1;
    const lastId = localStorage.getItem('lastFormId');
    if (lastId) {
        nextId = parseInt(lastId) + 1;
    }
    
    // Crea el nuevo formulario con el ID incrementado
    const nuevoFormulario = new FormularioContacto(nextId, nombre, email, mensaje);
    
    // Guarda el nuevo ID en localStorage para el siguiente formulario
    localStorage.setItem('lastFormId', nextId);
    // ----------------------------------------------------
    
    console.log("Nuevo formulario creado:", nuevoFormulario);
    
    const formularioJSON = JSON.stringify(nuevoFormulario);
    const claveLocalStorage = `formulario_${nuevoFormulario.id}`;
    localStorage.setItem(claveLocalStorage, formularioJSON);
    
    const form = document.getElementById('contactaFormulario'); 
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('d-none');
    
    form.reset();
    
    setTimeout(() => {
        successMessage.classList.add('d-none');
    }, 5000); 
}