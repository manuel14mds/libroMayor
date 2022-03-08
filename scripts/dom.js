

//crea y retorna el html de una cuenta con la cuenta recibida por parametros
function cuentaHTML(cuenta){
    let registrosDebito = cuenta.debito
    let registrosCredito = cuenta.credito
    
    let registrosDebitoHTML = ""
    let registrosCreditoHTML = ""
    for(registro of registrosDebito){
        let contador=1
        registrosDebitoHTML +=`
                            <div class="accordion listaRegistros" id="accordionExample">
                                <div class="card">
                                    <div class="card-header" id="headingOne">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
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
    for(registro of registrosCredito){
        let contador=1
        registrosCreditoHTML +=`
                            <div class="accordion listaRegistros" id="accordionExample">
                                <div class="card">
                                    <div class="card-header" id="headingOne">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
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

    let string = `
    <div id="cuenta" class="cuenta collapse">
                <div class="encabezado">
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
                        <p class="saldoIzquierda col">${cuenta.saldoTotal}</p>
                        <p class="saldoDerecha col"></p>
                    </div>
                </div>
            </div>
    
    `
    if(cuenta.naturaleza == "CREDITO"){
        let string = `
    <div id="cuenta" class="cuenta collapse">
                <div class="encabezado">
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
            </div>
    
    `
    }
    console.log(string)
    return string
}
let cuenta = obtenerCuenta(prompt("Digite cuenta"))

let contenedorMostrar = document.querySelector("#cuenta")
console.log(contenedorMostrar)
let nombreHTML = document.createElement("p")
nombreHTML.innerHTML= cuentaHTML(cuenta)
contenedorMostrar.appendChild(nombreHTML)