// Captura los datos de los imputs CrearCuenta
// devuelve un objeto con codigo y nombre ingresados
function capturarDatosCrearCuenta(){
    let nuevoCodigoCuenta = document.getElementById("codigoCrearCuenta").value
    let nuevoNombreCuenta = document.getElementById("nombreCrearCuenta").value
    return {codigo : nuevoCodigoCuenta, nombre : nuevoNombreCuenta}
}

// Evento para el botón Enviar del formulario Transacciones 
let btnCrearCuenta = document.getElementById("btn-crearCuenta")
btnCrearCuenta.addEventListener("click", () => {

    //guardo los datos de los imputs en la variable datos
    let datos = capturarDatosCrearCuenta()

    //Arma un objeto de tipo Cuenta
    let nuevaCuenta = crearCuenta(datos.codigo, datos.nombre)

    //crear cuenta no me retorna un objeto vacio, registro esa cuenta
    if (nuevaCuenta != null){
        registrarCuenta(nuevaCuenta)

        //Me limpia los campos del formulario
        document.getElementById("formCrearCuenta").reset()
    }
    
})
