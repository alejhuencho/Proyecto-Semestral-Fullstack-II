// Mensaje de Error
let mensajeError = "";

// Validaciones Registro Usuario
function validacionEditUser(usuarioGuardadoF, nombreF, contraseñaF, contraseñaConfirmF, correoF, correoConfirmF, numeroF, regionF, comunaF){
  mensajeError = "";
  let resultado = 0;
  if(valiNom(usuarioGuardadoF, nombreF) === false){
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

// Nombre
function valiNom(usuarioGuardadoF, nombreF){
  let result = 0;

  usuarioGuardadoF.forEach(usu => {
    if (usu.nombre ===  nombreF) {
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
  } else if (contraseñaF === ""){
    return true;
  }else {
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
  if(correoF === ""){
    return true;
  } else{
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

}

// Confirmar Correo
function correConfi(correoF, correoConfirmF){
  if(correoF === correoConfirmF){
    return true;
  } else {
    document.getElementById("labelCorreoConfirm").innerHTML = "Ambos correos deben ser iguales";
    return false;
  }
}

// Numero
function valiNum(numeroF){
  if(numeroF.trim() === ""){
    return true;
  }else{
    let numStr = numeroF.trim();
    numStr = numStr.replace(',' ,'');
    numStr = numStr.replace('.', '');
    if(numStr.length !== 8){
      document.getElementById("labelTel").innerHTML = "Deben ser 8 Numeros";
      return false;
    } else {
      return true;
    }
  }
}

// Region y Comuna
function valRegiCom(regionF, comunaF){
  if(regionF !== "Nada" && comunaF !== "0"){
    return true;
  }else if(regionF !== "Nada" && comunaF === ""){
    alert("Si ingresas una Region , debes ingresar su Comuna")
    return false;
  } else {
    return true;
  }
}