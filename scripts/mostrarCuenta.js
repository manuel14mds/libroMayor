
//crea y retorna con string con el HTML a insertar 
function stringCuentaHTML(cuenta){
    let string
    if(cuenta == null){  // Si la cuenta no existe en los arrays de grupos de cuentas
        string=`
                <div class="cuentaInexistente">
                    <button class="btn-close"><i class="fa-solid fa-xmark"></i></button>
                    <p>
                        La Cuenta No Está Registrada. Revisa la <a href="#listaCuentas">lista </a> de 
                        cuentas que ya estan registradas o por el contrario <a href="#crearCuenta">Creala</a>
                    </p>
                </div>
        `
    }
    else{ // Si la cuenta SI existe en los arrays de grupos de cuentas

        let registrosDebito = cuenta.debito //le asigno la lista de registros DEBITOS que tiene esa cuenta
        let registrosCredito = cuenta.credito //le asigno la lista de registros CREDITOS que tiene esa cuenta
        
        let registrosDebitoHTML = ""
        let registrosCreditoHTML = ""
        for(registro of registrosDebito){ //por cada registro en la lista añade un string de codigo HTML a la variable
            registrosDebitoHTML +=`
                                <div class="accordion listaRegistros" id="accordionExample">
                                    <div class="card">
                                        <div class="card-header" id="headingOne">
                                            <h2 class="mb-0">
                                                <button class="btn btn-link btn-block " type="button" data-toggle="collapse"
                                                data-target="#collapse${registro.codigo}" aria-expanded="true" aria-controls="collapseOne">
                                                ${registro.monto}
                                                </button>
                                            </h2>
                                        </div>
                                                    
                                        <div id="collapse${registro.codigo}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <div>
                                                    <td>Codigo: ${registro.codigo}</td>
                                                </div>
                                                <div>
                                                    <td>Fecha: ${registro.fecha}</td>
                                                </div>
                                                <div>
                                                    <td>Descripcion: ${registro.descripcion} </td>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

            `
        }
        for(registro of registrosCredito){//por cada registro en la lista añade un string de codigo HTML a la variable
            let contador=1
            registrosCreditoHTML +=`
                                <div class="accordion listaRegistros" id="accordionExample">
                                    <div class="card">
                                        <div class="card-header" id="headingOne">
                                            <h2 class="mb-0">
                                                <button class="btn btn-link btn-block" type="button" data-toggle="collapse"
                                                data-target="#collapse${registro.codigo}" aria-expanded="true" aria-controls="collapseOne">
                                                ${registro.monto}
                                                </button>
                                            </h2>
                                        </div>
                                                    
                                        <div id="collapse${registro.codigo}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <div class="card-body">
                                                <div>
                                                    <td>Codigo: ${registro.codigo}</td>
                                                </div>
                                                <div>
                                                    <td>Fecha: ${registro.fecha}</td>
                                                </div>
                                                <div>
                                                    <td>Descripcion: ${registro.descripcion} </td>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

            `
            contador++
        }
        

        //en el string se le agrega los valores que don dinamicos
        string = `
                    <div class="encabezado">
                        <button type="button" id="btn-close-mostarCuenta" class="btn-close"><i class="fa-solid fa-xmark"></i></button>
                        <div class="codigo">
                        <!-- ###################  CODIGO CUENTAL ###########################  -->
                            <label>${cuenta.codigo}</label>
                        </div>
                        <div class="nombre">
                        <!-- ###################  NOMBRE CUENTA ###########################  -->
                            <label>${cuenta.nombre}</label>
                        </div>
                    </div>
            
                    <div class="contenido row">
                <!-- Cuenta del lado Debito                      -->
                        <div class="ladoDebito col-6">
        
                            <div class="contenedorRegistro">
                                <div class="tittle">
                                    <p>Debito</p>
                                </div>
                <!-- Contenedor Lista DEBITO-->
                                <div class="output col">
        
                                    ${registrosDebitoHTML}
        
                                </div>
                        
                                <div class="saldoDebito col">
                                    <p class="tituloSaldo">Saldo Debito:</p>
                                    <!-- ###################  SALDO DEBITO ###########################  -->
                                    <p>${cuenta.saldoDebito}</p>
                                </div>
                            </div>
        
                        </div>
                <!-- Cuenta del lado Credito                 -->
                        <div class="ladoCredito col-6">
        
                            <div class="contenedorRegistro">
                                <div class="tittle">
                                    <p>Credito</p>
                                </div>
                <!-- Contenedor Lista CREDITO                   -->
                                <div class="output col">
        
                                    ${registrosCreditoHTML}
        
                                </div>
                        
                                <div class="saldoCredito col">
                                    <p class="tituloSaldo">Saldo Credito:</p>
                                    <!-- ###################  SALDO CREDITO ###########################  -->
                                    <p>${cuenta.saldoCredito}</p>
                                </div>
                            </div>
        
                        </div>
                    </div>
            
                    <div class="saldoTotal">
                        <p class="titulo">Saldo Total</p>
                        <div class="row container">

                        <!-- ###################  SALDO TOTAL ###########################  -->                    
                            <p class="saldoIzquierda col">${cuenta.saldoTotal}</p>
                            <p class="saldoDerecha col"></p>
                        </div>
                    </div>
        
        `

        //string con la particularidad de ser una cuenta de naturaleza credito
        if(cuenta.naturaleza == "CREDITO"){
            string = `
                    <div class="encabezado">
                        <button type="button" id="btn-close-mostarCuenta" class="btn-close"><i class="fa-solid fa-xmark"></i></button>
                        <div class="codigo">
                        <!-- ###################  CODIGO CUENTAL ###########################  -->
                            <label>${cuenta.codigo}</label>
                        </div>
                        <div class="nombre">
                        <!-- ###################  NOMBRE CUENTA ###########################  -->
                            <label>${cuenta.nombre}</label>
                        </div>
                    </div>
            
                    <div class="contenido row">
                <!-- Cuenta del lado Debito                      -->
                        <div class="ladoDebito col">
        
                            <div class="contenedorRegistro">
                                <div class="tittle">
                                    <p>Debito</p>
                                </div>
                <!-- Contenedor Lista DEBITO-->
                                <div class="output col">
        
                                    ${registrosDebitoHTML}
        
                                </div>
                        
                                <div class="saldoDebito col">
                                    <p class="tituloSaldo">Saldo Debito:</p>
                                    <!-- ###################  SALDO DEBITO ###########################  -->
                                    <p>${cuenta.saldoDebito}</p>
                                </div>
                            </div>
        
                        </div>
                <!-- Cuenta del lado Credito                 -->
                        <div class="ladoCredito col">
        
                            <div class="contenedorRegistro">
                                <div class="tittle">
                                    <p>Credito</p>
                                </div>
                <!-- Contenedor Lista CREDITO                   -->
                                <div class="output col">
        
                                    ${registrosCreditoHTML}
        
                                </div>
                        
                                <div class="saldoCredito col">
                                    <p class="tituloSaldo">Saldo Credito:</p>
                                    <!-- ###################  SALDO CREDITO ###########################  -->
                                    <p>${cuenta.saldoCredito}</p>
                                </div>
                            </div>
        
                        </div>
                    </div>
            
                    <div class="saldoTotal">
                        <p class="titulo">Saldo Total</p>
                        <div class="row container">

                        <!-- ###################  SALDO TOTAL ###########################  -->                    
                            <p class="saldoIzquierda col"></p>
                            <p class="saldoDerecha col">${cuenta.saldoTotal}</p>
                        </div>
                    </div>
        
        `
        }
    }
    
    return string
}

// me trae el valor del imput donde captura el codigo de la cuenta a mostrar
function obtenerCodigoCuenta(){
    return document.getElementById("codigoMostrarCuenta").value
}

// Evento para el botón buscar de (Mostrar Cuenta)
/* let enterMostrarCuenta = document.getElementById("codigoMostrarCuenta")
enterMostrarCuenta.addEventListener("keydown", (event) => {
    
    event.preventDefault();
    if(event.which === 13){

        let codigo = obtenerCodigoCuenta()
        let cuenta = obtenerCuenta(codigo)

        let contenedorMostrar = document.getElementById("cuenta")
        contenedorMostrar.textContent = ""
        let nombreHTML = document.createElement("div")

        nombreHTML.innerHTML= stringCuentaHTML(cuenta)
        contenedorMostrar.appendChild(nombreHTML)

        //limpia el texto ingresado de la casilla input
        document.getElementById("formMostrarCuenta").reset()

        let btnCerrarMostrarCuenta = document.getElementById("btn-close-mostarCuenta")
        btnCerrarMostrarCuenta.addEventListener("click", () => {
        let contMostrar = document.getElementById("cuenta")
        contMostrar.textContent = ""
    })
    }

}) */


let btnMostrarCuenta = document.getElementById("btn-mostrarCuenta")
btnMostrarCuenta.addEventListener("click", () => {

    let codigo = obtenerCodigoCuenta()
    let cuenta = obtenerCuenta(codigo, capturarInfoStotage())
    console.log("mostrar: "+cuenta)

    let contenedorMostrar = document.getElementById("cuenta")
    contenedorMostrar.textContent = ""
    let nombreHTML = document.createElement("div")

    nombreHTML.innerHTML= stringCuentaHTML(cuenta)
    contenedorMostrar.appendChild(nombreHTML)

    //limpia el texto ingresado de la casilla input
    document.getElementById("formMostrarCuenta").reset()

    let btnCerrarMostrarCuenta = document.getElementById("btn-close-mostarCuenta")
    btnCerrarMostrarCuenta.addEventListener("click", () => {
    let contMostrar = document.getElementById("cuenta")
    contMostrar.textContent = ""
    })
})

