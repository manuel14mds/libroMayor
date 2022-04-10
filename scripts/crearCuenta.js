// Captura los datos de los imputs CrearCuenta
// devuelve un objeto con codigo y nombre ingresados
function capturarDatosCrearCuenta() {
    let nuevoCodigoCuenta = document.getElementById("codigoCrearCuenta").value
    let nuevoNombreCuenta = document.getElementById("nombreCrearCuenta").value

    if (nuevoCodigoCuenta.trim() === "" || nuevoNombreCuenta.trim() === "") {
        
        let nodo = document.getElementById("crearCuenta")
        Toastify({
            text: "Rellene los campos",
            duration: 3000,
            selector: nodo,
            close: false,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                color: "#D9CAB3",
                background: "#212121",
            },
            onClick: function () { } // Callback after click
        }).showToast();
    }else{
        return { codigo: nuevoCodigoCuenta, nombre: nuevoNombreCuenta }
    }

}

function guardarDatosNuevaCuenta() {
    //guardo los datos de los imputs en la variable datos
    let datos = capturarDatosCrearCuenta()

    //Arma un objeto de tipo Cuenta
    let nuevaCuenta = crearCuenta(datos.codigo, datos.nombre)

    //crear cuenta no me retorna un objeto vacio, registro esa cuenta
    if (nuevaCuenta != null) {
        let respuesta = registrarCuenta(nuevaCuenta)
        if (respuesta == true) {
            //SweetAlert
            Swal.fire({
                title: "Registro Exitoso",
                text: "Así como tu",
                icon: "success"
            })



        } else {
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
}

// Evento para el botón Enviar del formulario Transacciones
let btnCrearCuenta = document.getElementById("btn-crearCuenta")
btnCrearCuenta.addEventListener("click", () => {
    guardarDatosNuevaCuenta()
})

// Evento para el enter-teclado del formulario Transacciones
let enterCrearCuenta = document.getElementById("nombreCrearCuenta")
enterCrearCuenta.addEventListener("keydown", (event) => {

    if (event.which === 13) {
        event.preventDefault();
        guardarDatosNuevaCuenta()
    }
})