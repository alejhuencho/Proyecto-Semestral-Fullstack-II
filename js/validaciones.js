// Mensaje de Error
let mensajeError = "";


// Validaciones Registro Usuario
function validacioneRegistroUsuario(usuarioGuardadoF, nombreF, rutF, contraseñaF, contraseñaConfirmF, correoF, correoConfirmF, numeroF, regionF, comunaF){
  mensajeError = "";
  let resultado = 0;
  if(valiNom(usuarioGuardadoF, nombreF) === false){
    resultado = 1;
  } else if(validarRut(rutF) === false){
    resultado = 1;
  } else if(valiPass(contraseñaF) === false){
    resultado = 1;
  } else if(passConfi(contraseñaF, contraseñaConfirmF) === false){
    resultado = 1;
  } else if(valiCorre(correoF) === false){
    resultado = 1;
  } else if(correConfi(correoF, correoConfirmF) === false){
    resultado = 1;
  } else if(valiNum(numeroF) === false){
    resultado = 1;
  } else if(valRegiCom(regionF, comunaF) === false){
    resultado = 1;
  }
  if(resultado === 1){
    return mensajeError;
  } else{
    return "";
  }
}

// Validaciones Nuevo Usuario
function validacionNuevoUsuario(usuarioGuardadoF, nombreF, rutF, contraseñaF, contraseñaConfirmF, correoF, correoConfirmF, numeroF, regionF, comunaF, rolUserF){
  mensajeError = "";
  let resultado = 0;
  if(valiNom(usuarioGuardadoF, nombreF) === false){
    resultado = 1;
  } else if(validarRut(rutF) === false){
    resultado = 1;
  } else if(valiPass(contraseñaF) === false){
    resultado = 1;
  } else if(passConfi(contraseñaF, contraseñaConfirmF) === false){
    resultado = 1;
  } else if(valiCorre(correoF) === false){
    resultado = 1;
  } else if(correConfi(correoF, correoConfirmF) === false){
    resultado = 1;
  } else if(valiNum(numeroF) === false){
    resultado = 1;
  } else if(valRegiCom(regionF, comunaF) === false){
    resultado = 1;
  } else if(valiUsuario(rolUserF) === false){
    resultado = 1;
  }
  if(resultado === 1){
    return mensajeError;
  } else{
    return "";
  }
}


// Nombre
function valiNom(usuarioGuardadoF, nombreF){
  let result = 0;

  usuarioGuardadoF.forEach(produ => {
    if (produ.nombre ===  nombreF) {
      mensajeError += "Ya hay un Usuario con este Nombre";
      result = 1;
    }
  });
  if(result === 0){
    return true;
  } else {
    return false;
  }
}


// Contraseña
function valiPass(contraseñaF){
  let valor = contraseñaF.length;
  if(valor < 4){
    mensajeError += "La contraseña es de minimo 4 caracteres";
    return false;
  } else {
    return true;
  }
}

// Confirmar Password
function passConfi(contraseñaF, contraseñaConfirmF){
  if(contraseñaF === contraseñaConfirmF){
    return true;
  } else {
    mensajeError += "Ambas contraseñas deben ser iguales";
    return false;
  }
}

// Correo
function valiCorre(correoF){
  let carFormado = ""; 
  let corteArroba = 0;

  let correLimp = correoF.trim();

  let larCorre = correLimp.length;

  for(let index = 0; index < larCorre; index++) {

    let caracter = correLimp.slice(index, index +1) 
    if(caracter === "@"){
      carFormado += caracter;
      corteArroba = 1; 
    } else if (corteArroba === 1){
      carFormado += caracter;
    }
  }
  if(carFormado === "@gmail.com" || carFormado === "@duoc.cl" || carFormado === "@profesor.duoc.cl") {
    console.log(carFormado);
    return true;
  } else {
    mensajeError += "Solo se permiten correos @gmail.com, @duoc.cl, @profesor.duoc.cl";
    return false; 
  }

}

// Confirmar Correo
function correConfi(correoF, correoConfirmF){
  if(correoF === correoConfirmF){
    return true;
  } else {
    mensajeError += "Ambos correos deben ser iguales";
    return false;
  }
}

// Numero
function valiNum(numeroF){
  if(numeroF === ""){
    return true;
  }else{
    let numStr = numeroF.trim()
    numStr = numStr.replace(',' ,'')
    numStr = numStr.replace('.', '')
    if(numStr.length !== 8){
      mensajeError += "Deben ser 8 Numeros";
      return false;
    } else {
      return true;
    }
  }
}

// Region y Comuna
function valRegiCom(regionF, comunaF){
  if(regionF === "Nada" || comunaF === ""){
    mensajeError += "Debe ingresar una Region y una Comuna"
    return false;
  } else {
    return true;
  }
}

// Rol de Usuario
function valiUsuario(rolUserF){
  if(rolUserF === "" || rolUser === "NoRol"){
    mensajeError += "Seleccione un rol para el Usuario"
    return false;
  } else {
    return true;
  }
}

// Rut
function validarRut(rutF) {
  var largo= rutF.length;
  if(largo!=9 && largo!=10){
      mensajeError += "El RUT esta mal Ingresado\nRecuerde no usar . ni ,";
      return false;
  }

  if(largo==9){ rutF="0"+rutF; }
  var factor=3;  
  var suma=0;
  for (let index = 0; index < 8; index++) {
    var caracter = rutF.slice(index,index+1);        
    suma+=(caracter*factor);
    factor--;  
    if(factor==1){ factor=7 ; }        
  }

  var resto = suma % 11;
  var dv= 11 - resto;
  if(dv==11){
    dv=0;
  }
  if(dv>9){
    dv="K";
  }
  var dvUsuario= rutF.slice(9,10).toUpperCase();
  if(dv==dvUsuario){
    return true;
  }else{
    mensajeError += "RUT no valido";
    return false;
  }
}
