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

    /* Swal.fire({
        title: "Hola",
        text: "Texto hola", 
        icon: "success"
    }) */



    /* Toastify({
        text: "This is a toast",
        className: "info",
        style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast(); */
    

    /* const dateTime=luxon.DateTime.local(2017, 5, 15, 8, 30);
    alert(dateTime) */

    //guardo los datos de los imputs en la variable datos
    let datos = capturarDatosCrearCuenta()

    //Arma un objeto de tipo Cuenta
    let nuevaCuenta = crearCuenta(datos.codigo, datos.nombre)

    //crear cuenta no me retorna un objeto vacio, registro esa cuenta
    if (nuevaCuenta != null){
        let respuesta = registrarCuenta(nuevaCuenta)
        if(respuesta == true){
            //SweetAlert
            Swal.fire({
                title: "Registro Exitoso",
                text: "Así como tu", 
                icon: "success"
            })
        }else{
            //SweetAlert
            Swal.fire({
                title: "Error",
                text: "No se pudo registrar la cuenta", 
                icon: "error"
            })
        }

        //Me limpia los campos del formulario
        document.getElementById("formCrearCuenta").reset()
    }
    
})
