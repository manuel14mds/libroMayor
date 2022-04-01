


function stringListaHTML(){
    let string=""
    let nombreCuentas=["Activos", "Pasivos", "Patrimonio", "Ingresos", "Gastos", "Costos"]
    let agrupacionLista = capturarInfoStotage()

    let i=0 //contador
    for(lista of agrupacionLista){

        string += `
        <div class="grupo row container-fluid ">
            <p>${nombreCuentas[i]}</p>
        </div>
        <!-- Encabezado de lista -->
        <div class="cabezaLista row container-fluid">
            <div class="col">Código</div>
            <div class="col">Nombre</div>
            <div class="col">Saldo Total</div>
        </div>
        
        `
        for(cuenta of lista){
            string+=`
            <div id="filaLista" class="filaLista row container-fluid">
                <div class="col">${cuenta.codigo}</div>
                <div class="col">${cuenta.nombre}</div>
                <div class="col">${cuenta.saldoTotal}</div>
            </div>
            
            `
        }

        i++
    }
    return string
}


let btnReloadListaCuentas = document.getElementById("btn-reload-listaCuentas")
btnReloadListaCuentas.addEventListener("click", () =>{
    let contenidoListas = document.getElementById("contenidoListas")
    contenidoListas.textContent= ""

    let insercionListas = document.createElement("div")
    insercionListas.innerHTML = stringListaHTML()

    contenidoListas.append(insercionListas)
})


let btnCloseListaCuentas = document.getElementById("btn-close-listaCuentas")
btnCloseListaCuentas.addEventListener("click", () =>{
    let contenidoListas = document.getElementById("contenidoListas")
    contenidoListas.textContent= ""
})