
function stringMovimientosHTML(){
    let string=""
    let lista= cuentasConMovim()

    if(lista.length < 1){
        string=`
                <div class="sinMovimientos container">
                    <p>No se registran cuentas con movimientos, cree transacciones
                        para que pueda ver reflejado en esta tista</p>
                </div>
        `
    }else{

        string +=`
                <div class="cabezaLista row container-fluid">
                    <div class="col">Código</div>
                    <div class="col">Nombre</div>
                    <div class="col">Saldo Total</div>
                </div>
        `
        for(const item of lista){
            string +=`
                <div class="filaLista row container-fluid">
                    <div class="col">${item.codigo}</div>
                    <div class="col">${item.nombre}</div>
                    <div class="col">${item.saldoTotal}</div>
                </div>
            `
        }
    }
    return string
}


//Me traigo el botón de recargar y de doy accion al clic
let btnReloadMovimientos = document.getElementById("btn-reload-movimientos")
btnReloadMovimientos.addEventListener("click", () =>{

    let contenidoListasMov = document.getElementById("contenidoListasMovimientos")
    contenidoListasMov.textContent= ""

    let insercionListasMov = document.createElement("div")
    insercionListasMov.innerHTML = stringMovimientosHTML()

    contenidoListasMov.append(insercionListasMov)
})


let btnCloseMovimientos = document.getElementById("btn-close-movimientos")
btnCloseMovimientos.addEventListener("click", () =>{
    let contenidoListasMov = document.getElementById("contenidoListasMovimientos")
    contenidoListasMov.textContent= ""
})