

function validarDatosObjeto(obj){ //me validara si un objeto esta con los valores completos
    // solo me devolverá un valor true siempre y cuando esten todos los campos llenos de datos y 
    if(obj.codigo == null || obj.codigo == undefined ||  obj.codigo == ""){
        return false
    }else if(obj.monto == null || obj.monto == undefined ||  obj.monto == 0){
        return false
    }else if(obj.operacion == null){
        return false
    }else{
        return true
    }
}

// Recibe la lista de objetos del formulario
// Devuelve una lista de los objetos que si estan completos para transar(lista validada)
function validarCamposLista(lista){
    let nuevaLista=[]
    for(obj of lista){
        if(validarDatosObjeto(obj)){
            nuevaLista.push(obj)
        }
    }
    return nuevaLista
}

//Recibe la lista de cuentas que SI tienen sus datos completos
//Devuelve True si todas las cuentas ya están registradas
function validarCuentasAptas(lista){
    for(obj of lista){
        if(validarCuenta(obj.codigo) == false){
            return false
        }
    }
    return true
}

// Recibe los dos valores check
// Devuelve (null) no estan marcados
// Devuelve (DEBITAR) si escogio esa opcion o (ACREDITAR)
function actualizarOperacion(opdeb, opcred){
    let operacion

    if(opdeb == false && opcred == false){
        operacion = null

    }else if(opdeb == true){
        operacion = "DEBITAR"

    }else{
        operacion = "ACREDITAR"
    }

    return operacion
}

//Captura todos los campos del formulario
//Arma una lista de objetos con los valores de los campos
function obtenerValoresInput(){
    lista=[]

    for(let i=1; i <= 4; i++){
        let codigoValor = document.getElementById(`codigo${i}`).value
        let montoValor = document.getElementById(`monto${i}`).value
        let checkDeb = document.getElementById(`check-deb${i}`).checked
        let checkCred = document.getElementById(`check-cred${i}`).checked
        let descripValor = document.getElementById(`inputTrans`).value
        let operacionValor = actualizarOperacion(checkDeb, checkCred)

        let objeto ={
            codigo : codigoValor,
            monto : montoValor,
            operacion : operacionValor,
            descripcion : descripValor
        }
        lista.push(objeto)
    }
    return lista
}

// Evento para el botón Enviar del formulario Transacciones 
let btnEnviarTransaccion = document.getElementById("btn-enviarTransaccion")
btnEnviarTransaccion.addEventListener("click", () => {
    //traigo todos los valores de los imputs del formulario
    let lista = obtenerValoresInput()

    //me traigo solo las cuentas que tienen datos completos para hacer una operacion
    lista = validarCamposLista(lista)

    //valido si la lista  tiene por lo menos dos cuentas llenas
    if(lista.length < 2){
        alert("Por lo menos deben estar dos cuentas funcionando correctamente")
    }else{

        //valido si las cuentas ya estan creadas
        if(validarCuentasAptas(lista) == false){
            alert("Operacion invalida, verifique si las cuentas ya están registradas")
        }else{

            generarTransaccion(lista)

            //Me limpia los campos del formulario
            document.getElementById("formTransaccion").reset()
        }


    }

})


