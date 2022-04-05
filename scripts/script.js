

//                                     ############   Clases   ################

class Registro {
    constructor(codigo, fecha, monto, descripcion) {
        this.fecha = fecha
        this.monto = parseFloat(monto)
        this.descripcion = descripcion
        this.codigo = codigo
    }
}

class Cuenta {
    constructor(codigo, nombre) {
        this.codigo = codigo
        this.nombre = nombre
        this.naturaleza = naturatezaCuenta(codigo)
        this.debito = []
        this.saldoDebito = 0
        this.credito = []
        this.saldoCredito = 0
        this.saldoTotal = null
    }
    debitar(registro){
        this.debito.push(registro)
        this.saldoDebito += parseFloat(registro.monto)
    }
    acreditar(registro) {
        this.credito.push(registro)
        this.saldoCredito += parseFloat(registro.monto)
    }
    saldarCuenta() {
        if (this.naturaleza == "DEBITO") {//-- si la naturaleza es debito
            this.saldoTotal = this.saldoDebito - this.saldoCredito
        } else if(this.naturaleza == "CREDITO"){// Si la naturaleza es credito
            this.saldoTotal = this.saldoCredito - this.saldoDebito
        }else{
            //sweetAlert
            Swal.fire({
                title: "Error",
                text: "No se pudo saldar la cuenta", 
                icon: "error"
            })
        }
    }
}

//                                     ############ Funciones ################
// captura el valor de la secuencia del storage
function capturarSecuenciaCodigo(){
    let secuencia= JSON.parse(localStorage.getItem("secuenciaCodigo"))
    
    //Si no hay secuencia, que la inicialice en 100
    if(secuencia == null){
        return 100
    }
    return secuencia
}

// Actualiza el valor de la secuencia del storage
function actualizarSecuenciaCodigo(secuencia){
    localStorage.setItem("secuenciaCodigo",JSON.stringify(secuencia))
}

//Trae la informacion de todas las listas del storage
//Devuelve una lista con todas las cuentas
function capturarInfoStotage(){
    let listaGeneral= JSON.parse(localStorage.getItem("GrupoCuentas"))
    if(listaGeneral == null || listaGeneral == undefined){
        return []
    }
    return listaGeneral
}

//me guarda y modifica la informacion al storage
function actualizarInfoStrorage(listaGeneral){
    localStorage.setItem("GrupoCuentas",JSON.stringify(listaGeneral))

}

function naturatezaCuenta(codigo) {// Me pide codigo de cuenta y me retorna su naturaleza
    const caracter=codigo.charAt(0)//me trael el primer caracter de la cadena

    switch (caracter) {
        case "1":
            return "DEBITO"
        case "2":
            return "CREDITO"
        case "3":
            return "CREDITO"
        case "4":
            return "CREDITO"
        case "5":
            return "DEBITO"
        case "6":
            return "DEBITO"
        default:
            return "INDEFINIDO"
    }
}

function generarCodigo(){ //genera un nuevo codigo, lo retorna y actualiza la secuencia
    secuencia=capturarSecuenciaCodigo()
    secuencia++
    actualizarSecuenciaCodigo(secuencia)
    return secuencia
}

function buscarCodigo(codigo, lista){//me devuelve un boolean si encuentra o no un objeto con el codigo en la lista
    for(const elemento of lista){
        if(elemento.codigo == codigo){
            return true
        }
    }
    return false
}

function obtenerCuenta(codigo, listaTodasCuentas){// me devuelve el objeto de las listas de grupos
    let grupoCuenta = codigo.charAt(0)
    switch (grupoCuenta) {
        case "1":
            for(const elemento of listaTodasCuentas[0]){
                if(elemento.codigo == codigo){
                    return elemento
                }
            }
        case "2":
            for(const elemento of listaTodasCuentas[1]){
                if(elemento.codigo == codigo){
                    return elemento
                }
            }
        case "3":
            for(const elemento of listaTodasCuentas[2]){
                if(elemento.codigo == codigo){
                    return elemento
                }
            }
        case "4":
            for(const elemento of listaTodasCuentas[3]){
                if(elemento.codigo == codigo){
                    return elemento
                }
            }
        case "5":
            for(const elemento of listaTodasCuentas[4]){
                if(elemento.codigo == codigo){
                    return elemento
                }
            }
        case "6":
            for(const elemento of listaTodasCuentas[5]){
                if(elemento.codigo == codigo){
                    return elemento
                }
            }
        }
        return null
}

function validarCuenta(codigo){ // me devuelve un boolean si la cuenta existe o no 
    let listaTodasCuentas = capturarInfoStotage()
    let grupoCuenta = naturatezaCuenta(codigo)
    switch (grupoCuenta) {
        case "1":
            return buscarCodigo(codigo, listaTodasCuentas[0])
        case "2":
            return buscarCodigo(codigo, listaTodasCuentas[1])
        case "3":
            return buscarCodigo(codigo, listaTodasCuentas[2])
        case "4":
            return buscarCodigo(codigo, listaTodasCuentas[3])
        case "5":
            return buscarCodigo(codigo, listaTodasCuentas[4])
        case "6":
            return buscarCodigo(codigo, listaTodasCuentas[5])
        }
}

function crearCuenta(codigo, nombre){ // se crea una nueva cuenta
    let listaTodasCuentas = capturarInfoStotage()
    if(naturatezaCuenta(codigo)=="INDEFINIDO"){//valido si el codigo pertenece a un grupo de cuentas
        //SweetAlert 
        Swal.fire({
            title: "Error",
            text: "Solo puede ingresar codigo del grupo de cuentas de la 1 a la 6", 
            icon: "error"
        })

    }else{
        if(obtenerCuenta(codigo, listaTodasCuentas) != null){// valido si la cuenta existe
            //SweetAlert 
            Swal.fire({
                title: "Error",
                text: "La cuenta ya ha sido registrada anteriormente", 
                icon: "error"
            })

        }else{
            return nuevaCuenta = new Cuenta(codigo, nombre)
        }
    }
}

// recive una nueva cuenta, la registra en su respectivo grupo, actualiza el storage
// me retorna un string si la cuenta se registró o no
function registrarCuenta(cuenta){
    //traigo la lista de todas las cuentas del storage
    let listaTodasCuentas = capturarInfoStotage()

    let estado = true
    let codigo = cuenta.codigo //obtengo el codigo de la cuenta
    const caracter=codigo.charAt(0)//me trael el primer caracter de la cadena del codigo
    switch (caracter) {
        case "1":
            listaTodasCuentas[0].unshift(cuenta)
            break
        case "2":
            listaTodasCuentas[1].unshift(cuenta)
            break
        case "3":
            listaTodasCuentas[2].unshift(cuenta)
            break
        case "4":
            listaTodasCuentas[3].unshift(cuenta)
            break
        case "5":
            listaTodasCuentas[4].unshift(cuenta)
            break
        case "6":
            listaTodasCuentas[5].unshift(cuenta)
            break
        default:
            estado = false
    }

    actualizarInfoStrorage(listaTodasCuentas)

    return estado
}

function generarFecha(){//genera una cadena con la fecha y lo retorna
    const dateTime=luxon.DateTime.now()
    return dateTime.toISODate()
}

function crearRegistro(monto, descripcion, codigo){  //  crea y retorna un nuevo registro
    let fecha=generarFecha()
    nuevoRegistro = new Registro(codigo, fecha, monto, descripcion)
    return nuevoRegistro
}

function cuentasConMovim(){ //Devuelve una lista de todas las cuentas con movimientos
    //Agrupo todas las cuentas de los grupos en una sola
    let todasCuentas = capturarInfoStotage()

    //Crea una nueva lista para guardar todos las cuentas con movimientos
    let lista = []

    //nueva lista donde se almacenan cada grupo de cuentas
    let nuevaLista = []

    //recorre toda la lista de grupos y por cada grupo filtra las cuentas con saldos
    for(const grupo of todasCuentas){
        nuevaLista = grupo.filter(element => element.saldoTotal != null)
        for (const cuenta of nuevaLista){
            lista.push(cuenta)
        }
    }
    return lista
}

//recibe una lista de objetos literales(obj{codigo:11, monto:500, operacion:debitar, descripcion:"sin descripcion"})
//Guarda los nuevos registros en las cuentas traidas por la lista de objetos
function generarTransaccion(lista){
    //me traigo los datos desde Storage
    let listaTodasCuentas = capturarInfoStotage()

    let cuenta
    let nuevoRegistro
    let nuevoCodigo = generarCodigo()
    //obj{codigo:11, monto:500, operacion:debitar, descripcion:"sin descripcion"}
    for(const obj of lista){
        nuevoRegistro=crearRegistro(obj.monto, obj.descripcion, nuevoCodigo)
        cuenta = obtenerCuenta(obj.codigo, listaTodasCuentas)
        if(obj.operacion == "DEBITAR"){
            /*
            cuenta.debitar(nuevoRegistro) */
            cuenta.debito.push(nuevoRegistro)
            cuenta.saldoDebito += parseFloat(nuevoRegistro.monto)
        }else{
            /* cuenta.acreditar(nuevoRegistro) */
            cuenta.credito.push(nuevoRegistro)
            cuenta.saldoCredito += parseFloat(nuevoRegistro.monto)
        }
        /* cuenta.saldarCuenta() */
        if (cuenta.naturaleza == "DEBITO") {//-- si la naturaleza es debito
            cuenta.saldoTotal = parseFloat(cuenta.saldoDebito) - parseFloat(cuenta.saldoCredito)
        } else if(cuenta.naturaleza == "CREDITO"){// Si la naturaleza es credito
            cuenta.saldoTotal = parseFloat(cuenta.saldoCredito) - parseFloat(cuenta.saldoDebito)
        }else{
            //SweetAlert
            Swal.fire({
                title: "Error",
                text: "No se pudo saldar la cuenta", 
                icon: "error"
            })
            
        }
    }
    actualizarInfoStrorage(listaTodasCuentas)

    //SweetAlert
    Swal.fire({
        title: "Transaccion Exitosa",
        icon: "success"
    })
}



//cargo los datos del archivo info.json

if(JSON.parse(localStorage.getItem("GrupoCuentas")) == null){
    try{
        /* let url = "http://127.0.0.1:5501/info.json" */
        let url = "./info.json"
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            actualizarInfoStrorage(data)
        })

    }catch(error){
        console.error(error);
    }
    /* const listaGrupo=[activos, pasivos, patrimonio, ingresos, gastos, costos]
    actualizarInfoStrorage(listaGrupo) */
}


